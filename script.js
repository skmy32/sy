const symbol = require('/node_modules/symbol-sdk')
const GENERATION_HASH = '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4'
const EPOCH = 1667250467
const XYM_ID = '72C0212E67A08BCE'
const NODE_URL = 'https://sym-test-03.opening-line.jp:3001'
const NET_TYPE = symbol.NetworkType.TEST_NET
const address = symbol.Address.createFromRawAddress("TBIFREIWF72G6USU7WFSB2ZRUHBAEUNRMLATSSA")
console.log("Hello Symbol")
console.log(`Your Address : ${address.plain()}`)

const repositoryFactory = new symbol.RepositoryFactoryHttp(NODE_URL)
const accountHttp = repositoryFactory.createAccountRepository()


const dom_addr = document.getElementById('wallet-addr')
dom_addr.innerText = address.pretty()

accountHttp.getAccountInfo(address)
  .toPromise()
  .then((accountInfo) => {
    console.log("acc", accountInfo)
    for (let m of accountInfo.mosaics) {
      console.log("mosaic", m)
      if (m.id.id.toHex() === XYM_ID) {
        const dom_xym = document.getElementById('wallet-xym')
        dom_xym.innerText = `XYM Balance : ${m.amount.compact() / Math.pow(10, 6)}`
      }
    }
  })

const transactionHttp = repositoryFactory.createTransactionRepository()
const searchCriteria = {
  group: symbol.TransactionGroup.Confirmed,
  address,
  pageNumber: 1,
  pageSize: 20,
  order: symbol.Order.Desc,
}
transactionHttp.search(searchCriteria)
  .toPromise()
  .then((txs) => {
    console.log(txs)
    const dom_txInfo = document.getElementById('wallet-transactions')
    for (let tx of txs.data) {
      console.log(tx)
      const dom_tx = document.createElement('div')
      const dom_txType = document.createElement('div')
      const dom_hash = document.createElement('div')

      dom_txType.innerText = `Transaction Type : ${getTransactionType(tx.type)}`
      dom_hash.innerText = `Transaction Hash : ${tx.transactionInfo.hash}`

      dom_tx.appendChild(dom_txType)
      dom_tx.appendChild(dom_hash)
      dom_tx.appendChild(document.createElement('hr'))

      dom_txInfo.appendChild(dom_tx)
    }
  })

function getTransactionType(type) {
  if (type === 16724) return 'TRANSFER TRANSACTION'
  return 'OTHER TRANSACTION'
}