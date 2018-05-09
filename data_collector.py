import time
import os
import random

from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub

hostname = os.uname()[1]

pnconfig = PNConfiguration()

pnconfig.publish_key = 'pub-c-7805ed36-f5af-48a4-9574-224a779d3416'
pnconfig.subscribe_key = 'sub-c-2583d912-4f1e-11e8-9796-063929a21258'
 
pubnub = PubNub(pnconfig)
 
def my_publish_callback(envelope, status):
    # Check whether request successfully completed or not
    if not status.is_error():
        pass  # Data successfully published 
    else:
        pass  # Handle message publish error. Check 'category' property to find out possible issue
        # because of which request did fail.
        # Request can be resent using: [status retry];
 
 
class MySubscribeCallback(SubscribeCallback):
    def presence(self, pubnub, presence):
        pass  # presence data
 
    def status(self, pubnub, status):
        if status.category == PNStatusCategory.PNUnexpectedDisconnectCategory:
            pass  # When connection is lost
 
        elif status.category == PNStatusCategory.PNConnectedCategory:
            while True:
                temperature = random.randint(20,23) # mimicking temperature data 
                pubnub.publish().channel(hostname).message(
                    {
                        'DeviceName': hostname,
                        'Temperature': temperature,
                    }
                ).async(my_publish_callback)
        elif status.category == PNStatusCategory.PNReconnectedCategory:
            pass
            # When radio is lost then reconnected
        elif status.category == PNStatusCategory.PNDecryptionErrorCategory:
            pass
            # Handle message decryption error. Probably client configured to
            # encrypt messages and on live data feed it received plain text.
 
    def message(self, pubnub, message):
        print(message.message)
 
pubnub.add_channel_to_channel_group().\
    channels([hostname]).\
    channel_group('parcel').\
    sync()
pubnub.add_listener(MySubscribeCallback())
pubnub.subscribe().channels(hostname).execute()