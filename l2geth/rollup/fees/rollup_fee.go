package fees

import (
<<<<<<< HEAD
=======
	"bytes"
	"context"
>>>>>>> 2c741af18943321173153180956f4bf84445a337
	"errors"
	"fmt"
	"math"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/params"
	"github.com/ethereum/go-ethereum/rollup/rcfg"
)

var (
<<<<<<< HEAD
	// errFeeTooLow represents the error case of then the user pays too little
	ErrFeeTooLow = errors.New("fee too low")
	// errFeeTooHigh represents the error case of when the user pays too much
	ErrFeeTooHigh = errors.New("fee too high")
=======
	// ErrGasPriceTooLow represents the error case of then the user pays too little
	ErrGasPriceTooLow = errors.New("gas price too low")
	// ErrGasPriceTooHigh represents the error case of when the user pays too much
	ErrGasPriceTooHigh = errors.New("gas price too high")
	// ErrInsufficientFunds represents the error case of when the user doesn't
	// have enough funds to cover the transaction
	ErrInsufficientFunds = errors.New("insufficient funds for l1Fee + l2Fee + value")
>>>>>>> 2c741af18943321173153180956f4bf84445a337
	// errMissingInput represents the error case of missing required input to
	// PaysEnough
	errMissingInput = errors.New("missing input")
	// ErrL2GasLimitTooLow represents the error case of when a user sends a
	// transaction to the sequencer with a L2 gas limit that is too small
	ErrL2GasLimitTooLow = errors.New("L2 gas limit too low")
<<<<<<< HEAD
)

// overhead represents the fixed cost of batch submission of a single
// transaction in gas.
const overhead uint64 = 2750

// feeScalar is used to scale the calculations in EncodeL2GasLimit
// to prevent them from being too large
const feeScalar uint64 = 10_000_000

// TxGasPrice is a constant that determines the result of `eth_gasPrice`
// It is scaled upwards by 50%
// tx.gasPrice is hard coded to 1500 * wei and all transactions must set that
// gas price.
const TxGasPrice uint64 = feeScalar + (feeScalar / 2)

// BigTxGasPrice is the L2GasPrice as type big.Int
var BigTxGasPrice = new(big.Int).SetUint64(TxGasPrice)
var bigFeeScalar = new(big.Int).SetUint64(feeScalar)

const tenThousand = 10000

var BigTenThousand = new(big.Int).SetUint64(tenThousand)

// EncodeTxGasLimit computes the `tx.gasLimit` based on the L1/L2 gas prices and
// the L2 gas limit. The L2 gas limit is encoded inside of the lower order bits
// of the number like so: [          | l2GasLimit ]
//                        [      tx.gaslimit      ]
// The lower order bits must be large enough to fit the L2 gas limit, so 10**8
// is chosen. If higher order bits collide with any bits from the L2 gas limit,
// the L2 gas limit will not be able to be decoded.
// An explicit design goal of this scheme was to make the L2 gas limit be human
// readable. The entire number is interpreted as the gas limit when computing
// the fee, so increasing the L2 Gas limit will increase the fee paid.
// The calculation is:
// l1GasLimit = zero_count(data) * 4 + non_zero_count(data) * 16 + overhead
// roundedL2GasLimit = ceilmod(l2GasLimit, 10_000)
// l1Fee = l1GasPrice * l1GasLimit
// l2Fee = l2GasPrice * roundedL2GasLimit
// sum = l1Fee + l2Fee
// scaled = sum / scalar
// rounded = ceilmod(scaled, tenThousand)
// roundedScaledL2GasLimit = roundedL2GasLimit / tenThousand
// result = rounded + roundedScaledL2GasLimit
// Note that for simplicity purposes, only the calldata is passed into this
// function when in reality the RLP encoded transaction should be. The
// additional cost is added to the overhead constant to prevent the need to RLP
// encode transactions during calls to `eth_estimateGas`
func EncodeTxGasLimit(data []byte, l1GasPrice, l2GasLimit, l2GasPrice *big.Int) *big.Int {
	l1GasLimit := calculateL1GasLimit(data, overhead)
	roundedL2GasLimit := Ceilmod(l2GasLimit, BigTenThousand)
	l1Fee := new(big.Int).Mul(l1GasPrice, l1GasLimit)
	l2Fee := new(big.Int).Mul(l2GasPrice, roundedL2GasLimit)
	sum := new(big.Int).Add(l1Fee, l2Fee)
	scaled := new(big.Int).Div(sum, bigFeeScalar)
	rounded := Ceilmod(scaled, BigTenThousand)
	roundedScaledL2GasLimit := new(big.Int).Div(roundedL2GasLimit, BigTenThousand)
	result := new(big.Int).Add(rounded, roundedScaledL2GasLimit)
	return result
}

func Ceilmod(a, b *big.Int) *big.Int {
	remainder := new(big.Int).Mod(a, b)
	if remainder.Cmp(common.Big0) == 0 {
		return a
	}
	sum := new(big.Int).Add(a, b)
	rounded := new(big.Int).Sub(sum, remainder)
	return rounded
}

// DecodeL2GasLimit decodes the L2 gas limit from an encoded L2 gas limit
func DecodeL2GasLimit(gasLimit *big.Int) *big.Int {
	scaled := new(big.Int).Mod(gasLimit, BigTenThousand)
	return new(big.Int).Mul(scaled, BigTenThousand)
}

func DecodeL2GasLimitU64(gasLimit uint64) uint64 {
	scaled := gasLimit % tenThousand
	return scaled * tenThousand
}

// PaysEnoughOpts represent the options to PaysEnough
type PaysEnoughOpts struct {
	UserFee, ExpectedFee       *big.Int
	ThresholdUp, ThresholdDown *big.Float
}

// PaysEnough returns an error if the fee is not large enough
// `GasPrice` and `Fee` are required arguments.
func PaysEnough(opts *PaysEnoughOpts) error {
	if opts.UserFee == nil {
		return fmt.Errorf("%w: no user fee", errMissingInput)
	}
	if opts.ExpectedFee == nil {
		return fmt.Errorf("%w: no expected fee", errMissingInput)
	}

	fee := new(big.Int).Set(opts.ExpectedFee)
	// Allow for a downward buffer to protect against L1 gas price volatility
	if opts.ThresholdDown != nil {
		fee = mulByFloat(fee, opts.ThresholdDown)
	}
	// Protect the sequencer from being underpaid
	// if user fee < expected fee, return error
	if opts.UserFee.Cmp(fee) == -1 {
		return ErrFeeTooLow
	}
	// Protect users from overpaying by too much
	if opts.ThresholdUp != nil {
		// overpaying = user fee - expected fee
		overpaying := new(big.Int).Sub(opts.UserFee, opts.ExpectedFee)
		threshold := mulByFloat(opts.ExpectedFee, opts.ThresholdUp)
		// if overpaying > threshold, return error
		if overpaying.Cmp(threshold) == 1 {
			return ErrFeeTooHigh
		}
	}
	return nil
}

func mulByFloat(num *big.Int, float *big.Float) *big.Int {
	n := new(big.Float).SetUint64(num.Uint64())
	product := n.Mul(n, float)
	pfloat, _ := product.Float64()
	rounded := math.Ceil(pfloat)
	return new(big.Int).SetUint64(uint64(rounded))
}

// calculateL1GasLimit computes the L1 gasLimit based on the calldata and
=======
	// errTransactionSigned represents the error case of passing in a signed
	// transaction to the L1 fee calculation routine. The signature is accounted
	// for externally
	errTransactionSigned = errors.New("transaction is signed")
	// big10 is used for decimal scaling
	big10 = new(big.Int).SetUint64(10)
)

// Message represents the interface of a message.
// It should be a subset of the methods found on
// types.Message
type Message interface {
	From() common.Address
	To() *common.Address
	GasPrice() *big.Int
	Gas() uint64
	Value() *big.Int
	Nonce() uint64
	Data() []byte
}

// StateDB represents the StateDB interface
// required to compute the L1 fee
type StateDB interface {
	GetState(common.Address, common.Hash) common.Hash
}

// RollupOracle represents the interface of the in
// memory cache of the gas price oracle
type RollupOracle interface {
	SuggestL1GasPrice(ctx context.Context) (*big.Int, error)
	SuggestL2GasPrice(ctx context.Context) (*big.Int, error)
	SuggestOverhead(ctx context.Context) (*big.Int, error)
	SuggestScalar(ctx context.Context) (*big.Float, error)
}

// CalculateTotalFee will calculate the total fee given a transaction.
// This function is used at the RPC layer to ensure that users
// have enough ETH to cover their fee
func CalculateTotalFee(tx *types.Transaction, gpo RollupOracle) (*big.Int, error) {
	// Read the variables from the cache
	l1GasPrice, err := gpo.SuggestL1GasPrice(context.Background())
	if err != nil {
		return nil, err
	}
	overhead, err := gpo.SuggestOverhead(context.Background())
	if err != nil {
		return nil, err
	}
	scalar, err := gpo.SuggestScalar(context.Background())
	if err != nil {
		return nil, err
	}

	unsigned := copyTransaction(tx)
	raw, err := rlpEncode(unsigned)
	if err != nil {
		return nil, err
	}

	l1Fee := CalculateL1Fee(raw, overhead, l1GasPrice, scalar)
	l2GasLimit := new(big.Int).SetUint64(tx.Gas())
	l2Fee := new(big.Int).Mul(tx.GasPrice(), l2GasLimit)
	fee := new(big.Int).Add(l1Fee, l2Fee)
	return fee, nil
}

// CalculateMsgFee will calculate the total fee given a Message.
// This function is used during the state transition to transfer
// value to the sequencer. Since Messages do not have a signature
// and the signature is submitted to L1 in a batch, extra bytes
// are padded to the raw transaction
func CalculateTotalMsgFee(msg Message, state StateDB, gasUsed *big.Int, gpo *common.Address) (*big.Int, error) {
	if gpo == nil {
		gpo = &rcfg.L2GasPriceOracleAddress
	}

	l1Fee, err := CalculateL1MsgFee(msg, state, gpo)
	if err != nil {
		return nil, err
	}
	// Multiply the gas price and the gas used to get the L2 fee
	l2Fee := new(big.Int).Mul(msg.GasPrice(), gasUsed)
	// Add the L1 cost and the L2 cost to get the total fee being paid
	fee := new(big.Int).Add(l1Fee, l2Fee)
	return fee, nil
}

// CalculateL1MsgFee computes the L1 portion of the fee given
// a Message and a StateDB
func CalculateL1MsgFee(msg Message, state StateDB, gpo *common.Address) (*big.Int, error) {
	tx := asTransaction(msg)
	raw, err := rlpEncode(tx)
	if err != nil {
		return nil, err
	}

	if gpo == nil {
		gpo = &rcfg.L2GasPriceOracleAddress
	}

	l1GasPrice, overhead, scalar := readGPOStorageSlots(*gpo, state)
	l1Fee := CalculateL1Fee(raw, overhead, l1GasPrice, scalar)
	return l1Fee, nil
}

// CalculateL1Fee computes the L1 fee
func CalculateL1Fee(data []byte, overhead, l1GasPrice *big.Int, scalar *big.Float) *big.Int {
	l1GasUsed := CalculateL1GasUsed(data, overhead)
	l1Fee := new(big.Int).Mul(l1GasUsed, l1GasPrice)
	return mulByFloat(l1Fee, scalar)
}

// CalculateL1GasUsed computes the L1 gas used based on the calldata and
>>>>>>> 2c741af18943321173153180956f4bf84445a337
// constant sized overhead. The overhead can be decreased as the cost of the
// batch submission goes down via contract optimizations. This will not overflow
// under standard network conditions.
func CalculateL1GasUsed(data []byte, overhead *big.Int) *big.Int {
	zeroes, ones := zeroesAndOnes(data)
	zeroesGas := zeroes * params.TxDataZeroGas
	onesGas := (ones + 68) * params.TxDataNonZeroGasEIP2028
	l1Gas := new(big.Int).SetUint64(zeroesGas + onesGas)
	return new(big.Int).Add(l1Gas, overhead)
}

// DeriveL1GasInfo reads L1 gas related information to be included
// on the receipt
func DeriveL1GasInfo(msg Message, state StateDB) (*big.Int, *big.Int, *big.Int, *big.Float, error) {
	tx := asTransaction(msg)
	raw, err := rlpEncode(tx)
	if err != nil {
		return nil, nil, nil, nil, err
	}

	l1GasPrice, overhead, scalar := readGPOStorageSlots(rcfg.L2GasPriceOracleAddress, state)
	l1GasUsed := CalculateL1GasUsed(raw, overhead)
	l1Fee := CalculateL1Fee(raw, overhead, l1GasPrice, scalar)
	return l1Fee, l1GasPrice, l1GasUsed, scalar, nil
}

func readGPOStorageSlots(addr common.Address, state StateDB) (*big.Int, *big.Int, *big.Float) {
	l1GasPrice := state.GetState(addr, rcfg.L1GasPriceSlot)
	overhead := state.GetState(addr, rcfg.OverheadSlot)
	scalar := state.GetState(addr, rcfg.ScalarSlot)
	decimals := state.GetState(addr, rcfg.DecimalsSlot)
	scaled := ScaleDecimals(scalar.Big(), decimals.Big())
	return l1GasPrice.Big(), overhead.Big(), scaled
}

// ScaleDecimals will scale a value by decimals
func ScaleDecimals(scalar, decimals *big.Int) *big.Float {
	// 10**decimals
	divisor := new(big.Int).Exp(big10, decimals, nil)
	fscalar := new(big.Float).SetInt(scalar)
	fdivisor := new(big.Float).SetInt(divisor)
	// fscalar / fdivisor
	return new(big.Float).Quo(fscalar, fdivisor)
}

// rlpEncode RLP encodes the transaction into bytes
// When a signature is not included, set pad to true to
// fill in a dummy signature full on non 0 bytes
func rlpEncode(tx *types.Transaction) ([]byte, error) {
	raw := new(bytes.Buffer)
	if err := tx.EncodeRLP(raw); err != nil {
		return nil, err
	}

	r, v, s := tx.RawSignatureValues()
	if r.Cmp(common.Big0) != 0 || v.Cmp(common.Big0) != 0 || s.Cmp(common.Big0) != 0 {
		return nil, errTransactionSigned
	}

	// Slice off the 0 bytes representing the signature
	b := raw.Bytes()
	return b[:len(b)-3], nil
}

// asTransaction turns a Message into a types.Transaction
func asTransaction(msg Message) *types.Transaction {
	if msg.To() == nil {
		return types.NewContractCreation(
			msg.Nonce(),
			msg.Value(),
			msg.Gas(),
			msg.GasPrice(),
			msg.Data(),
		)
	}
	return types.NewTransaction(
		msg.Nonce(),
		*msg.To(),
		msg.Value(),
		msg.Gas(),
		msg.GasPrice(),
		msg.Data(),
	)
}

// copyTransaction copies the transaction, removing the signature
func copyTransaction(tx *types.Transaction) *types.Transaction {
	if tx.To() == nil {
		return types.NewContractCreation(
			tx.Nonce(),
			tx.Value(),
			tx.Gas(),
			tx.GasPrice(),
			tx.Data(),
		)
	}
	return types.NewTransaction(
		tx.Nonce(),
		*tx.To(),
		tx.Value(),
		tx.Gas(),
		tx.GasPrice(),
		tx.Data(),
	)
}

// PaysEnoughOpts represent the options to PaysEnough
type PaysEnoughOpts struct {
	UserGasPrice, ExpectedGasPrice *big.Int
	ThresholdUp, ThresholdDown     *big.Float
}

// PaysEnough returns an error if the fee is not large enough
// `GasPrice` and `Fee` are required arguments.
func PaysEnough(opts *PaysEnoughOpts) error {
	if opts.UserGasPrice == nil {
		return fmt.Errorf("%w: no user fee", errMissingInput)
	}
	if opts.ExpectedGasPrice == nil {
		return fmt.Errorf("%w: no expected fee", errMissingInput)
	}

	fee := new(big.Int).Set(opts.ExpectedGasPrice)
	// Allow for a downward buffer to protect against L1 gas price volatility
	if opts.ThresholdDown != nil {
		fee = mulByFloat(fee, opts.ThresholdDown)
	}
	// Protect the sequencer from being underpaid
	// if user fee < expected fee, return error
	if opts.UserGasPrice.Cmp(fee) == -1 {
		return ErrGasPriceTooLow
	}
	// Protect users from overpaying by too much
	if opts.ThresholdUp != nil {
		// overpaying = user fee - expected fee
		overpaying := new(big.Int).Sub(opts.UserGasPrice, opts.ExpectedGasPrice)
		threshold := mulByFloat(opts.ExpectedGasPrice, opts.ThresholdUp)
		// if overpaying > threshold, return error
		if overpaying.Cmp(threshold) == 1 {
			return ErrGasPriceTooHigh
		}
	}
	return nil
}

// zeroesAndOnes counts the number of 0 bytes and non 0 bytes in a byte slice
func zeroesAndOnes(data []byte) (uint64, uint64) {
	var zeroes uint64
	var ones uint64
	for _, byt := range data {
		if byt == 0 {
			zeroes++
		} else {
			ones++
		}
	}
	return zeroes, ones
}

// mulByFloat multiplies a big.Int by a float and returns the
// big.Int rounded upwards
func mulByFloat(num *big.Int, float *big.Float) *big.Int {
	n := new(big.Float).SetUint64(num.Uint64())
	product := n.Mul(n, float)
	pfloat, _ := product.Float64()
	rounded := math.Ceil(pfloat)
	return new(big.Int).SetUint64(uint64(rounded))
}
