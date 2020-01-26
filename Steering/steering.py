#!/usr/bin/env python

import rospy
import std_msgs
import motor
import argparse
import time


                        #add other parameters later
parser = argparse.ArgumentParser()
parser.add_argument("-a", "--address", help="address of motor driver connection")
parser.add_argument("-po", "--port", help="port of motor driver connection")
parser.add_argument("-p", "--P", help="P value of PID controller")
parser.add_argument("-i", "--I", help="I value of PID controller")
parser.add_argument("-d", "--D", help="D value of PID controller")

args = parser.parse_args()

address = args.address
port = int(args.port)
p = float(args.P)
i = float(args.I)
d = float(args.D)


def init_motor():     #add other parameters later
    steeringMotor.connect()

    steeringMotor.setCurrentLimit(4000)
    steeringMotor.windUpGaurd(1500)
    steeringMotor.setEncoderTicks(735*4)
    steeringMotor.setControlMode(2)
    steeringMotor.setWheelDiameter(.4)

    #-- important infos --#
    steeringMotor.setPid(p, i, d) #0.2, 0.2, 0
    steeringMotor.setAcceleration(6)
    steeringMotor.setDeceleration(6)


def ticks_to_angle(ticks):
    return (52.5/10000)*(ticks)

                    #assume linear interpolation, ticks range from -10000->+10000, angles range from -52.5->+52.5 degrees
                    #assume steering is calibrated such that tick 0 corresponds to angle 0

def angle_to_ticks(angle):          
    return (10000/52.5)*angle

def set_tick(desired_ticks):
    
    if(desired_ticks > 10000 or desired_ticks < -10000):
        print("Invalid input, angle range is from +50 to -50 degrees")
        exit()

    current_tick = steeringMotor.currentEncoderTicks()
    

    try:
        if(desired_ticks > current_tick):
            time.sleep(0.01)            #add delay for pcb communication time
            steeringMotor.requestTickVelocity(-1000)
            time.sleep(0.01)
            while(desired_ticks > steeringMotor.currentEncoderTicks()):
                time.sleep(0.01)
                print("desired ticks {0}\t {1} \tpositive".format(desired_ticks,steeringMotor.currentEncoderTicks()))
                time.sleep(0.01)

        elif(desired_ticks < current_tick):
            time.sleep(0.01)
            steeringMotor.requestTickVelocity(1000)
            time.sleep(0.01)
            while(desired_ticks < steeringMotor.currentEncoderTicks()):
                time.sleep(0.01)
                print("desired ticks {0}\t {1} \tnegative".format(desired_ticks,steeringMotor.currentEncoderTicks()))
                time.sleep(0.01)


    finally:
        time.sleep(0.01)
        steeringMotor.requestTickVelocity(0)
        print("Exiting")


def callback(data):
    pub = rospy.Publisher("current_angle", std_msgs.msg.Float32, queue_size=10)
    rate = rospy.Rate(10)
    init_ticks = steeringMotor.currentEncoderTicks()
    init_angle = ticks_to_angle(init_ticks)
    print("init angle {0}".format(init_angle))
    pub.publish(init_angle)

    desired_ticks = angle_to_ticks(data.data)
    print("desired ticks {0}".format(desired_ticks)) 
    set_tick(desired_ticks)


def listener():
    rospy.Subscriber("desired_angle", std_msgs.msg.Float32, callback)
    rospy.spin()

def main():
    rospy.init_node('steering_node', anonymous=True)
    
    init_motor()
    print("Init position {0}".format(steeringMotor.currentEncoderTicks()))

    listener()

if __name__ == "__main__":
    steeringMotor = motor.nextEng(address, port)
    main()