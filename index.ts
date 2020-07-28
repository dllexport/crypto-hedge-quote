import { PublicClient } from '@okfe/okex-node';
import redis from 'redis';

const Tickers = ["BTC", "ETC", "LTC", "EOS", "XRP", "BCH", "BSV", "TRX", "ETH"];

const FetchSpot = () => {
    for (let ticker of Tickers) {
        (async () => {
            while (1) {
                await new Promise(r => setTimeout(r, 500));
                try {
                    const pClient = PublicClient();
                    let res = await pClient.spot().getSpotBook(`${ticker}-USDT`, { size: "10" });
                    const client = redis.createClient();
                    client.on("error", function (error) {
                        // console.error(error);
                    });
                    client.set(`${ticker}-USDT`, JSON.stringify(res));
                    // console.log(res);
                } catch (e) {
                    console.log(e);
                }
            }
        })();
    }
}

const FetchFuture = () => {
    for (let ticker of Tickers) {
        (async () => {
            while (1) {
                await new Promise(r => setTimeout(r, 500));
                try {
                    const pClient = PublicClient();
                    let res = await pClient.futures().getBook(`${ticker}-USD-200925`, { size: "10" });
                    const client = redis.createClient();
                    client.on("error", function (error) {
                        // console.log("redis error");
                    });
                    client.set(`${ticker}-USD-200925`, JSON.stringify(res));
                    // console.log(res);
                } catch (e) {
                    console.log(e);
                }
            }
        })();
    }
}


FetchSpot();
FetchFuture();


