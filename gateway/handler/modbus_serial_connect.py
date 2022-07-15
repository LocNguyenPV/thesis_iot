from multiprocessing import Queue, Process
import serial.tools.list_ports
import time
import apps.home.__sensor_reading.utils.crc_modbus_16_calculation as chkSum
serial_model = None


dict_sensor = {}


def getAvailableComPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    port = None
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return port, commPort


def initSerialModel():
    global serial_model
    # if serial_model == None:
    _, comPortStr = getAvailableComPort()
    serial_model = serial.Serial(
        port=comPortStr,
        baudrate=9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        timeout=1,
        write_timeout=1)



def sendRequestToSensor(request):
    # if(serial_model == None):
    #     _, comPortStr = getAvailableComPort()
    #     serial_model = serial.Serial(
    #         port=comPortStr,
    #         baudrate=9600,
    #         parity=serial.PARITY_NONE,
    #         stopbits=serial.STOPBITS_ONE,
    #         timeout=1,
    #         write_timeout=1)
    # global response_queue
    serial_model.write(serial.to_bytes(request["requests"]))
    time.sleep(0.5)
    bytesToRead = serial_model.inWaiting()
    value = 0
    label = request["requests"][2:4]
    if (bytesToRead > 0):
        output = serial_model.read(bytesToRead)
        data_array = [data for data in output]
        match len(data_array):
            case 7:
                value = (data_array[3]*256 + data_array[4])/10
            case 9:
                value = (data_array[6]*256 + data_array[7])/10
    return value


def startProcesses():
    initSerialModel()


if __name__ == "__main__":
    startProcesses()
