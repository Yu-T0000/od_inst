from pythonosc import dispatcher
from pythonosc.osc_server import BlockingOSCUDPServer
from pythonosc.udp_client import SimpleUDPClient
from typing import List,Any
import socket




def printdata(address: str, *osc_arguments: List[str]):
    print(address + "  " + str(osc_arguments[0]))

def default_handler(address, *args):
    print(f"DEFAULT {address}: {args}")

dispatcher = dispatcher.Dispatcher()
dispatcher.map("/*", printdata) #確認用


def connect(): 
    ip = "127.0.0.1"
    port = 7500
    print(ip,port)
    server = BlockingOSCUDPServer((ip, port), dispatcher)
    print("connect")
    server.serve_forever()  # Blocks forever

if __name__ == "__main__":
    connect()


    pass