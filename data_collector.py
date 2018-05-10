import time
import os
import random

from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub

hostname = os.uname()[1]

pnconfig = PNConfiguration()

pnconfig.publish_key = 'insert_your_pub_key'
pnconfig.subscribe_key = 'insert_your_sub_key'
 
pubnub = PubNub(pnconfig)
 
def my_publish_callback(envelope, status):
    if not status.is_error():
        pass
    else:
        pass
 
 
class MySubscribeCallback(SubscribeCallback):
    def presence(self, pubnub, presence):
        pass
 
    def status(self, pubnub, status):
        if status.category == PNStatusCategory.PNUnexpectedDisconnectCategory:
            pass
 
        elif status.category == PNStatusCategory.PNConnectedCategory:
            while True:
                temperature = random.randint(20,23)
                pubnub.publish().channel(hostname).message(
                    {
                        'Temperature': temperature
                    }
                ).async(my_publish_callback)
                time.sleep(3)
        elif status.category == PNStatusCategory.PNReconnectedCategory:
            pass
        elif status.category == PNStatusCategory.PNDecryptionErrorCategory:
            pass
 
    def message(self, pubnub, message):
        print(message.message)

pubnub.add_channel_to_channel_group().\
    channels([hostname]).\
    channel_group('your_channel_group').\
    sync()

pubnub.add_listener(MySubscribeCallback())
pubnub.subscribe().channels(hostname).execute()
