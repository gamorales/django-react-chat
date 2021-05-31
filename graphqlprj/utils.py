import urllib.request
import csv
import codecs


def decoupled(stock_code):
    """
    Calls an API using the "stock_code" as a parameter
    (https://stooq.com/q/l/?s={stock_code}&f=sd2t2ohlcv&h&e=csv), then will parse the
    received CSV file and send a message back into the chatroom. The message is the
    stock quote using the following format: “APPL.US quote is $93.42 per share”.

    :param stock_code:
    :return: String with the following format: “{stock_code} quote is ${value}
             per share”.
    """

    url = f"https://stooq.com/q/l/?s={stock_code}&f=sd2t2ohlcv&h&e=csv"
    csv_data = urllib.request.urlopen(url)
    read = csv.reader(codecs.iterdecode(csv_data, "utf-8"))
    next(read, None)  # Avoid headers
    for row in read:
        return f"{row[0]} quote is ${row[3]} per share"
