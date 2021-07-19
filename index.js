//	@ghasemkiani/exchanging-api

const xpath = require("xpath");
const {DOMParser} = require("xmldom");

const {Obj: Base} = require("@ghasemkiani/base/obj");
const {cutil} = require("@ghasemkiani/base/cutil");
const {fetcher} = require("@ghasemkiani/net-utils/web/client");

class ExchangingAPI extends cutil.mixin(Base, fetcher) {
	// _url
	// _cfg
	// currencies
	get url() {
		if(!this._url) {
			this._url = "https://exchanging.ir/prices.xml";
		}
		 return this._url;
	}
	set url(url) {
		 this._url = url;
	}
	get cfg() {
		if(!this._cfg) {
			this._cfg = [{
					"currency": "webmoney",
					"id": 1,
					"k": 1
				}, {
					"currency": "perfectmoney",
					"id": 2,
					"k": 1
				}, {
					"currency": "bitcoin",
					"id": 3,
					"k": 0.001
				}, {
					"currency": "tether",
					"id": 4,
					"k": 1
				}, {
					"currency": "wex",
					"id": 6,
					"k": 1
				}, {
					"currency": "litecoin",
					"id": 7,
					"k": 1
				}, {
					"currency": "etherium",
					"id": 8,
					"k": 1
				}, {
					"currency": "dash",
					"id": 9,
					"k": 1
				}, {
					"currency": "bitcoincash",
					"id": 10,
					"k": 1
				}, {
					"currency": "zcash",
					"id": 11,
					"k": 1
				}, {
					"currency": "ripple",
					"id": 12,
					"k": 1
				}, {
					"currency": "monero",
					"id": 13,
					"k": 1
				}, {
					"currency": "bitcoingold",
					"id": 14,
					"k": 1
				}, {
					"currency": "etheriumclassic",
					"id": 15,
					"k": 1
				}, {
					"currency": "iota",
					"id": 16,
					"k": 1000000
				}
			];
		}
		return this._cfg;
	}
	set cfg(cfg) {
		this._cfg = cfg;
	}
	async toUpdate() {
		let rsp = await this.toFetch(this.url);
		let text = await rsp.text();
		let document = new DOMParser().parseFromString(text);
		this.currencies = {};
		this.cfg.forEach(item => {
			this.currencies[item.currency] = {
				buy_price: cutil.asNumber(xpath.select(`string(/emonies/emoney[id=${item.id}]/buy_price)`, document)) / item.k,
				sell_price: cutil.asNumber(xpath.select(`string(/emonies/emoney[id=${item.id}]/sell_price)`, document)) / item.k,
				reserve: cutil.asNumber(xpath.select(`string(/emonies/emoney[id=${item.id}]/reserve)`, document)) * item.k,
			};
		});
		return this;
	}
}

module.exports = {
	ExchangingAPI,
};
