from pythonosc.udp_client import SimpleUDPClient
import time

ip = "127.0.0.1"
port = 4560

client = SimpleUDPClient(ip, port)  # Create client

pan = 1

while pan > -1:
    client.send_message("pan/", [pan])   # Send float message
    print(pan)
    pan -= 0.1
    time.sleep(1.2)