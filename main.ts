let humidity = 0
let temperature = 0
let light_intensity = 0
microIoT.microIoT_initDisplay()
microIoT.microIoT_WIFI("DGINCB_WT6F", "20210601")
microIoT.microIoT_MQTT(
"vkW338gnR",
"DkZq38gnRz",
"DanDCZznR",
microIoT.SERVERS.English
)
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_3, "nzLkKLzng")
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_1, "bCGskhz7R")
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_2, "CU5yz2k7R")
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P0,
    true,
    false,
    true
    )
    dht11_dht22.selectTempType(tempType.celsius)
    light_intensity = 1023 - pins.analogReadPin(AnalogPin.P1)
    temperature = dht11_dht22.readData(dataType.temperature)
    humidity = dht11_dht22.readData(dataType.humidity)
    microIoT.microIoT_SendMessage(convertToText(light_intensity), microIoT.TOPIC.topic_3)
    microIoT.microIoT_SendMessage(convertToText(temperature), microIoT.TOPIC.topic_2)
    microIoT.microIoT_SendMessage(convertToText(humidity), microIoT.TOPIC.topic_2)
    microIoT.microIoT_showUserText(1, "temp: " + temperature)
    microIoT.microIoT_showUserText(2, "humd: " + humidity)
    microIoT.microIoT_showUserText(0, "light: " + light_intensity)
    basic.pause(1000)
})
basic.forever(function () {
    if (light_intensity < 500) {
        pins.analogWritePin(AnalogPin.P12, 500)
    } else {
        pins.analogWritePin(AnalogPin.P12, 0)
    }
    if (temperature > 26) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 180)
    } else {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
    }
    if (humidity > 75) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 180)
    } else {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
    }
})
