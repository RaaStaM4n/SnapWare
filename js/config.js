"use strict";
$.routes = function(a, b) {
    return {
        desktop: {
            "public": [{
                name: "public",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b["public"]
                    }
                }
            }, {
                name: "public.404",
                state: {
                    url: "/404/",
                    templateUrl: "404.html"
                }
            }, {
                name: "public.blockedAccess",
                state: {
                    url: "/blockedAccess/",
                    templateUrl: "views/blocked-access.html",
                    controller: "BlockedAccessController"
                }
            }],
            anon: [{
                name: "anon",
                state: {
                    "abstract": !0,
                    template: "<ui-view/>",
                    data: {
                        access: b.anon
                    }
                }
            }, {
                name: "anon.login",
                state: {
                    url: "/login/:user",
                    templateUrl: a.simpleLogin ? "views/base.html" : "views/login.html",
                    controller: "LoginController"
                }
            }, {
                name: "anon.login.simple",
                state: {
                    url: "/credentials",
                    templateUrl: "views/loginSimple.html",
                    controller: "LoginController"
                }
            }, {
                name: "anon.androidHelp",
                state: {
                    url: "/androidHelp/",
                    templateUrl: "views/android-help.html",
                    controller: "LoginController"
                }
            }, {
                name: "anon.mysagemcombox",
                state: {
                    "abstract": !0,
                    url: "/mybox",
                    templateUrl: "views/base.html"
                }
            }, {
                name: "anon.mysagemcombox.deviceInfo",
                state: {
                    url: "/deviceInfo",
                    templateUrl: "views/mysagemcombox.simple-main.html"
                }
            }, {
                name: "anon.mysagemcombox.deviceInfo.general",
                state: {
                    url: "/general",
                    templateUrl: "views/mysagemcombox.device-info.device-info.html",
                    controller: "DeviceInformationController"
                }
            }],
            user: [{
                name: "user",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b.guest
                    }
                }
            }, {
                name: "user.homefirst",
                state: {
                    url: "/firstAccess",
                    templateUrl: "views/first-access.html",
                    controller: "FirstAccessController"
                }
            }, {
                name: "user.homefirst.user",
                state: {
                    url: "/user",
                    templateUrl: "views/first-access.user.html",
                    controller: "AccessControlUserController"
                }
            }, {
                name: "user.homefirst.connection",
                state: {
                    url: "/connection",
                    templateUrl: "views/first-access.connection.html",
                    controller: "ConnectedDevicesController"
                }
            }, {
                name: "user.homefirst.ppp",
                state: {
                    url: "/ppp",
                    templateUrl: "views/first-access.ppp.html",
                    controller: "PPPController"
                }
            }, {
                name: "user.homefirst.wifi",
                state: {
                    url: "/wifi/:radio/:firstAccessPPP",
                    templateUrl: "views/first-access.wifi.html",
                    controller: "WiFiBasicController"
                }
            }, {
                name: "user.homefirst.end",
                state: {
                    url: "/finish",
                    templateUrl: "views/first-access.end.html",
                    controller: "EndController"
                }
            }, {
                name: "user.home",
                state: {
                    url: "/",
                    templateUrl: a.mainPage || "views/main.html",
                    controller: "ConnectedDevicesController"
                }
            }, {
                name: "user.mysagemcombox",
                state: {
                    url: "/mybox",
                    templateUrl: "views/mysagemcombox.main.html"
                }
            }, {
                name: "user.mysagemcombox.deviceInfo",
                state: {
                    url: "/deviceInfo",
                    templateUrl: "views/mysagemcombox.device-info.main.html"
                }
            }, {
                name: "user.mysagemcombox.dhcp",
                state: {
                    url: "/DHCP",
                    templateUrl: "views/mysagemcombox.dhcp.html",
                    controller: "DhcpController",
                    data: {
                        module: "lanIpv4"
                    }
                }
            }, {
                name: "user.mysagemcombox.deviceInfo.dhcpLeases",
                state: {
                    url: "/dhcpLeases",
                    templateUrl: "views/mysagemcombox.device-info.dhcp-leases.html",
                    controller: "DhcpLeasesController",
                    data: {
                        module: "dhcpLeases"
                    }
                }
            }, {
                name: "user.mysagemcombox.deviceInfo.statistics",
                state: {
                    url: "/statistics",
                    templateUrl: "views/mysagemcombox.device-info.statistics.html",
                    controller: "StatisticsController",
                    data: {
                        module: "statistics"
                    }
                }
            }, {
                name: "user.mysagemcombox.deviceInfo.arp",
                state: {
                    url: "/arp",
                    templateUrl: "views/mysagemcombox.device-info.arp.html",
                    controller: "ARPController",
                    data: {
                        module: "arpTable"
                    }
                }
            }, {
                name: "user.mysagemcombox.deviceInfo.docsis",
                state: {
                    url: "/docsis",
                    templateUrl: "views/mysagemcombox.device-info.docsis.html",
                    controller: "DeviceInformationController",
                    data: {
                        module: "docsis"
                    }
                }
            }, {
                name: "user.mysagemcombox.deviceInfo.connection",
                state: {
                    url: "/connection",
                    templateUrl: "views/mysagemcombox.device-info.connection.html",
                    controller: "CableModemConnectionController",
                    data: {
                        title: "connection"
                    }
                }
            }, {
                name: "user.mysagemcombox.deviceInfo.configuration",
                state: {
                    url: "/configuration",
                    controller: "MaintenanceResetController",
                    templateUrl: "views/mysagemcombox.device-info.configuration.html",
                    data: {
                        title: "configuration"
                    }
                }
            }, {
                name: "user.mysagemcombox.deviceInfo.deviceInfo",
                state: {
                    url: "/deviceInfo",
                    templateUrl: "views/mysagemcombox.device-info.device-info.html",
                    controller: "DeviceInformationController"
                }
            }, {
                name: "user.mysagemcombox.mass-storage",
                state: {
                    url: "/mass-storage/",
                    templateUrl: "views/mysagemcombox.mass-storage.html",
                    controller: "MassStorageController"
                }
            }, {
                name: "user.mysagemcombox.dns",
                state: {
                    url: "/dns",
                    templateUrl: "views/mysagemcombox.dns.main.html"
                }
            }, {
                name: "user.mysagemcombox.dns.server",
                state: {
                    url: "/server",
                    templateUrl: "views/mysagemcombox.dns.server.html",
                    controller: "DnsServerController"
                }
            }, {
                name: "user.mysagemcombox.ddns",
                state: {
                    url: "/ddns",
                    templateUrl: "views/mysagemcombox.ddns.html",
                    controller: "DdnsController",
                    data: {
                        module: "dyndns"
                    }
                }
            }, {
                name: "user.mysagemcombox.bridgemode",
                state: {
                    url: "/bridgemode",
                    templateUrl: "views/mysagemcombox.bridge-mode.html",
                    controller: "BridgeModeController",
                    data: {
                        module: "bridgemode"
                    }
                }
            }, {
                name: "user.mysagemcombox.walledgarden",
                state: {
                    url: "/walledgarden",
                    templateUrl: "views/mysagemcombox.walled-garden.html",
                    controller: "WalledGardenController",
                    data: {
                        module: "walledgarden"
                    }
                }
            }, {
                name: "user.mysagemcombox.maintenance",
                state: {
                    url: "/maintenance",
                    controller: "MaintenanceMainController",
                    templateUrl: a.simpleMaintenance ? "views/mysagemcombox.maintenance.mainSimple.html" : "views/mysagemcombox.maintenance.main.html"
                }
            }, {
                name: "user.mysagemcombox.maintenance.reset",
                state: {
                    url: "/reset",
                    templateUrl: "views/mysagemcombox.maintenance.reset.html",
                    controller: "MaintenanceResetController"
                }
            }, {
                name: "user.mysagemcombox.maintenance.log",
                state: {
                    url: "/log",
                    templateUrl: "views/mysagemcombox.maintenance.log.main.html"
                }
            }, {
                name: "user.mysagemcombox.maintenance.log.systemlog",
                state: {
                    url: "/system-log",
                    templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                    controller: "MaintenanceSystemLogController"
                }
            }, {
                name: "user.mysagemcombox.maintenance.log.operatorlog",
                state: {
                    url: "/operator-log",
                    templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                    controller: "MaintenanceSystemLogController",
                    data: {
                        type: "operator"
                    }
                }
            }, {
                name: "user.mysagemcombox.maintenance.log.securitylog",
                state: {
                    url: "/security-log",
                    templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                    controller: "MaintenanceSystemLogController",
                    data: {
                        type: "firewall"
                    }
                }
            }, {
                name: "user.mysagemcombox.maintenance.log.upnplog",
                state: {
                    url: "/upnp-log",
                    templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                    controller: "MaintenanceSystemLogController",
                    data: {
                        type: "upnp"
                    }
                }
            }, {
                name: "user.mysagemcombox.maintenance.tr69",
                state: {
                    url: "/tr69",
                    templateUrl: "views/mysagemcombox.maintenance.tr69.html",
                    controller: "MaintenanceTr69Controller"
                }
            }, {
                name: "user.mysagemcombox.maintenance.firmwareUpdate",
                state: {
                    url: "/firmware-update",
                    templateUrl: "views/mysagemcombox.maintenance.firmware-update.html",
                    controller: "MaintenanceResetController"
                }
            }, {
                name: "user.mysagemcombox.maintenance.internetUtilities",
                state: {
                    url: "/internet-utilities",
                    templateUrl: "views/mysagemcombox.maintenance.internet-utilities.html",
                    controller: "MaintenanceInternetUtilitiesController",
                    data: {
                        module: "internetUtilities"
                    }
                }
            }, {
                name: "user.mysagemcombox.maintenance.filteredUtilities",
                state: {
                    url: "/internet-utilities/:tool",
                    templateUrl: "views/mysagemcombox.maintenance.internet-utilities.html",
                    controller: "MaintenanceInternetUtilitiesController"
                }
            }, {
                name: "user.mysagemcombox.maintenance.bkpRestore",
                state: {
                    url: "/backup-restore",
                    templateUrl: "views/mysagemcombox.maintenance.bkpRestore.html",
                    controller: "MaintenanceResetController",
                    data: {
                        module: "bkpRestore"
                    }
                }
            }, {
                name: "user.mysagemcombox.maintenance.ntp",
                state: {
                    url: "/ntp",
                    templateUrl: "views/mysagemcombox.maintenance.ntp.html",
                    controller: "NTPController",
                    data: {
                        module: "ntp"
                    }
                }
            }, {
                name: "user.mysagemcombox.maintenance.healthCheck",
                state: {
                    url: "/healthCheck",
                    templateUrl: "views/mysagemcombox.maintenance.health-check.html",
                    controller: "MaintenanceHealthCheckController"
                }
            }, {
                name: "user.mysagemcombox.maintenance.firstInstall",
                state: {
                    url: "/firstInstall",
                    templateUrl: "views/mysagemcombox.maintenance.first-install.html"
                }
            }, {
                name: "user.mysagemcombox.autodimming",
                state: {
                    url: "/autodimming",
                    templateUrl: "views/mysagemcombox.autodimming.html",
                    controller: "AutoDimmingController"
                }
            }, {
                name: "user.mysagemcombox.monitor",
                state: {
                    url: "/monitor",
                    templateUrl: "views/mysagemcombox.monitor.main.html"
                }
            }, {
                name: "user.mysagemcombox.monitor.quick",
                state: {
                    url: "/:monitorTab",
                    templateUrl: "views/mysagemcombox.monitor.quick.html",
                    controller: "BandWidthMonitoringController"
                }
            }, {
                name: "user.mysagemcombox.monitor.traffic",
                state: {
                    url: "/history/:monitorTab",
                    templateUrl: "views/mysagemcombox.monitor.traffic.html",
                    controller: "BandWidthMonitoringController"
                }
            }, {
                name: "user.mysagemcombox.lanIpv6",
                state: {
                    url: "/lanIpv6",
                    templateUrl: "views/mysagemcombox.lan-ipv6.html",
                    controller: "LanIPv6Controller"
                }
            }, {
                name: "user.mysagemcombox.ecoMode",
                state: {
                    url: "/ecoMode",
                    templateUrl: "views/mysagemcombox.eco-mode.html",
                    controller: "LEDController"
                }
            }, {
                name: "user.mysagemcombox.led",
                state: {
                    url: "/led",
                    templateUrl: "views/mysagemcombox.led.html",
                    controller: "LEDController"
                }
            }, {
                name: "user.mysagemcombox.ledSlider",
                state: {
                    url: "/led-slider",
                    templateUrl: "views/mysagemcombox.led-slider.html",
                    controller: "LEDSliderController"
                }
            }, {
                name: "user.ethernet",
                state: {
                    url: "/ethernet",
                    templateUrl: "views/ethernet.html",
                    controller: "EthernetController"
                }
            }, {
                name: "user.wifi",
                state: {
                    url: "/wifi/:radio/:mode",
                    templateUrl: "views/wifi.main.html",
                    controller: "WifiMainController"
                }
            }, {
                name: "user.wifi.basic",
                state: {
                    url: "/basic",
                    templateUrl: "views/wifi.basic.html",
                    controller: "WiFiBasicController",
                    data: {
                        module: "wifiBasic"
                    }
                }
            }, {
                name: "user.wifi.advanced",
                state: {
                    url: "/advanced",
                    templateUrl: "views/wifi.advanced.html",
                    controller: "WiFiAdvancedController",
                    data: {
                        module: "wifiAdvanced"
                    }
                }
            }, {
                name: "user.wifi.wps",
                state: {
                    url: "/wps",
                    templateUrl: "views/wifi.wps.html",
                    controller: "WiFiWPSController",
                    data: {
                        module: "wifiWPS"
                    }
                }
            }, {
                name: "user.wifi.stats",
                state: {
                    url: "/stats",
                    templateUrl: "views/wifi.stats.html",
                    controller: "WiFiStatsController",
                    data: {
                        module: "wifiStats"
                    }
                }
            }, {
                name: "user.wifi.mac-filter",
                state: {
                    url: "/mac-filter",
                    templateUrl: "views/wifi.mac-filter.html",
                    controller: "WiFiMacFilterController",
                    data: {
                        module: "wifiMacFilter"
                    }
                }
            }, {
                name: "user.wifi.scheduling",
                state: {
                    url: "/scheduling",
                    templateUrl: "views/wifi.scheduling.html",
                    controller: "WifiSchedulingController"
                }
            }, {
                name: "user.wifi.environment",
                state: {
                    url: "/environment",
                    templateUrl: "views/wifi.environment.main.html"
                }
            }, {
                name: "user.wifi.environment.scan",
                state: {
                    url: "/scan",
                    templateUrl: "views/wifi.environment.scan.html",
                    controller: "WiFiEnvironmentController"
                }
            }, {
                name: "user.wifi.environment.recommended",
                state: {
                    url: "/recommended",
                    templateUrl: "views/wifi.environment.recommended.html",
                    controller: "WiFiChannelController"
                }
            }, {
                name: "user.wifi.guest",
                state: {
                    url: "/guest",
                    templateUrl: "views/wifi.guest.html"
                }
            }, {
                name: "user.wifi.wds",
                state: {
                    url: "/wds",
                    templateUrl: "views/wifi.wds.html"
                }
            }, {
                name: "user.accessControl",
                state: {
                    url: "/access-control",
                    templateUrl: "views/access-control.main.html"
                }
            }, {
                name: "user.accessControl.dmz",
                state: {
                    url: "/dmz",
                    templateUrl: "views/access-control.dmz.html",
                    controller: "DMZController"
                }
            }, {
                name: "user.accessControl.dmzIPv6",
                state: {
                    url: "/dmzIPv6",
                    templateUrl: "views/access-control.dmz-ipv6.html",
                    controller: "DmzIPv6Controller"
                }
            }, {
                name: "user.accessControl.natMapping",
                state: {
                    url: "/nat-mapping",
                    templateUrl: "views/access-control.nat-mapping.html",
                    controller: "NatMappingController"
                }
            }, {
                name: "user.accessControl.firewall",
                state: {
                    url: "/firewall",
                    templateUrl: "views/access-control.firewall.html",
                    controller: "FirewallController",
                    data: {
                        module: "firewall"
                    }
                }
            }, {
                name: "user.accessControl.remoteaccess",
                state: {
                    url: "/remote-access",
                    templateUrl: "views/access-control.remote-access.html",
                    controller: "RemoteManagementController",
                    data: {
                        module: "remoteAccess"
                    }
                }
            }, {
                name: "user.accessControl.user",
                state: {
                    url: "/user",
                    templateUrl: "views/access-control.user.html",
                    controller: "AccessControlUserController"
                }
            }, {
                name: "user.accessControl.upnp",
                state: {
                    url: "/upnp",
                    templateUrl: "views/access-control.upnp.html",
                    controller: "UPnPController"
                }
            }, {
                name: "user.accessControl.parentalControl",
                state: {
                    url: "/parental-control",
                    templateUrl: "views/access-control.parental-control.main.html"
                }
            }, {
                name: "user.accessControl.parentalControl.planning",
                state: {
                    url: "/planning",
                    templateUrl: "views/access-control.parental-control.planning.html",
                    controller: "ParentalControllerPlanning"
                }
            }, {
                name: "user.accessControl.parentalControl.planningTimeslot",
                state: {
                    url: "/planning-timeslot",
                    templateUrl: "views/access-control.parental-control.planning.timeslot.html",
                    controller: "ParentalControllerPlanningTimeslot"
                }
            }, {
                name: "user.accessControl.parentalControl.filtering",
                state: {
                    url: "/filtering",
                    templateUrl: "views/access-control.parental-control.filtering.html",
                    controller: "ParentalControllerFiltering"
                }
            }, {
                name: "user.accessControl.parentalControl.control",
                state: {
                    url: "/control",
                    templateUrl: "views/access-control.parental-control.profile.html",
                    controller: "ParentalControllerProfiles"
                }
            }, {
                name: "user.accessControl.portForwarding",
                state: {
                    url: "/port-forwarding",
                    templateUrl: "views/access-control.port-forwarding.main.html",
                    data: {
                        module: "portForwarding"
                    }
                }
            }, {
                name: "user.accessControl.portForwarding.addRule",
                state: {
                    url: "/add-rule",
                    templateUrl: "views/access-control.port-forwarding.html",
                    controller: "PortForwardingController"
                }
            }, {
                name: "user.accessControl.portForwarding.gamesApp",
                state: {
                    url: "/games-app",
                    templateUrl: "views/access-control.port-forwarding.games-app.html",
                    controller: "GamesController"
                }
            }, {
                name: "user.accessControl.portTriggering",
                state: {
                    url: "/port-triggering",
                    templateUrl: "views/access-control.port-triggering.html",
                    controller: "PortTriggeringController",
                    data: {
                        module: "portTriggering"
                    }
                }
            }, {
                name: "user.accessControl.certificates",
                state: {
                    url: "/certificates",
                    templateUrl: "views/access-control.certificates.main.html"
                }
            }, {
                name: "user.accessControl.certificates.local",
                state: {
                    url: "/local",
                    templateUrl: "views/access-control.certificates.local.html"
                }
            }, {
                name: "user.accessControl.certificates.remote",
                state: {
                    url: "/remote",
                    templateUrl: "views/access-control.certificates.remote.html"
                }
            }, {
                name: "user.accessControl.vpn",
                state: {
                    url: "/vpn",
                    templateUrl: "views/access-control.vpn.main.html"
                }
            }, {
                name: "user.accessControl.vpn.lt2p",
                state: {
                    url: "/lt2p",
                    templateUrl: "views/access-control.vpn.lt2p.html"
                }
            }, {
                name: "user.accessControl.vpn.ipsec",
                state: {
                    url: "/ipSec",
                    templateUrl: "views/access-control.vpn.ipsec.html"
                }
            }, {
                name: "user.ethernetDevice",
                state: {
                    url: "/device/:layer/:uid",
                    templateUrl: "views/ethernet-device.main.html",
                    controller: "EthernetDeviceMainController"
                }
            }, {
                name: "user.ethernetDevice.deviceInfo",
                state: {
                    url: "/device-info",
                    templateUrl: "views/ethernet-device.device-info.html",
                    controller: "EthernetDeviceController"
                }
            }, {
                name: "user.ethernetDevice.dmz",
                state: {
                    url: "/dmz",
                    templateUrl: "views/ethernet-device.dmz.html",
                    controller: "DMZController",
                    data: {
                        module: "dmz"
                    }
                }
            }, {
                name: "user.ethernetDevice.portForwarding",
                state: {
                    url: "/port-forwarding",
                    templateUrl: "views/ethernet-device.port-forwarding.main.html",
                    controller: "EthernetDevicePFMainController"
                }
            }, {
                name: "user.ethernetDevice.portForwarding.addRule",
                state: {
                    url: "/add-rule",
                    templateUrl: "views/access-control.port-forwarding.html",
                    controller: "PortForwardingController"
                }
            }, {
                name: "user.ethernetDevice.portForwarding.gamesApp",
                state: {
                    url: "/games-app",
                    templateUrl: "views/access-control.port-forwarding.games-app.html",
                    controller: "GamesController"
                }
            }, {
                name: "user.ethernetDevice.firewall",
                state: {
                    url: "/firewall",
                    templateUrl: "views/access-control.firewall.html",
                    controller: "FirewallController"
                }
            }, {
                name: "user.ethernetDevice.parentalControl",
                state: {
                    url: "/parental-control",
                    templateUrl: "views/access-control.parental-control.planning.html",
                    controller: "ParentalControllerPlanning"
                }
            }, {
                name: "user.plcDevice",
                state: {
                    url: "/plc/:uid",
                    templateUrl: "views/plc.device-info.html",
                    controller: "PlcDeviceController"
                }
            }, {
                name: "user.usbDevice",
                state: {
                    url: "/usb-devices/:uid",
                    templateUrl: "views/usb-device.main.html",
                    controller: "UsbDeviceMainController"
                }
            }, {
                name: "user.usbDevice.deviceInfo",
                state: {
                    url: "/usb-devices-info/",
                    templateUrl: "views/usb-device.device-info.html",
                    controller: "UsbDeviceController"
                }
            }, {
                name: "user.usbDevice.massStorage",
                state: {
                    url: "/mass-storage/",
                    templateUrl: "views/mysagemcombox.mass-storage.html",
                    controller: "MassStorageController"
                }
            }, {
                name: "user.mysagemcombox.route",
                state: {
                    url: "/route",
                    templateUrl: "views/mysagemcombox.route.main.html",
                    data: {
                        module: "route"
                    }
                }
            }, {
                name: "user.mysagemcombox.route.static",
                state: {
                    url: "/static",
                    templateUrl: "views/mysagemcombox.route.static.html",
                    controller: "RouteStaticController"
                }
            }, {
                name: "user.mysagemcombox.mymedia",
                state: {
                    url: "/myMedia",
                    templateUrl: "views/my.media.html",
                    controller: "MyMediaController"
                }
            }, {
                name: "user.mycloud",
                state: {
                    url: "/mycloud",
                    templateUrl: "views/mycloud.main.html"
                }
            }, {
                name: "user.mycloud.login",
                state: {
                    url: "/login",
                    templateUrl: "views/mycloud.login.html",
                    controller: "MyCloudController"
                }
            }, {
                name: "user.mycloud.dropbox",
                state: {
                    url: "/dropbox",
                    templateUrl: "views/mycloud.dropbox.html",
                    controller: "MyCloudController"
                }
            }, {
                name: "user.phonebook",
                state: {
                    url: "/phonebook",
                    templateUrl: "views/phonebook.main.html"
                }
            }, {
                name: "user.phonebook.contacts",
                state: {
                    url: "/contacts",
                    templateUrl: "views/phonebook.contacts.html",
                    controller: "PhonebookContactsController"
                }
            }, {
                name: "user.phonebook.callLog",
                state: {
                    url: "/callLog",
                    templateUrl: "views/phonebook.call-log.html",
                    controller: "VoiceDeviceController"
                }
            }, {
                name: "user.answeringMachine",
                state: {
                    url: "/answering-machine",
                    templateUrl: "views/answering-machine.main.html"
                }
            }, {
                name: "user.answeringMachine.messages",
                state: {
                    url: "/messages",
                    templateUrl: "views/answering-machine.messages.html",
                    controller: "AnsweringMachineMessagesController"
                }
            }, {
                name: "user.answeringMachine.settings",
                state: {
                    url: "/settings/:uid",
                    templateUrl: "views/answering-machine.settings.html",
                    controller: "AnsweringMachineSettingsController"
                }
            }, {
                name: "user.answeringMachine.mail-server",
                state: {
                    url: "/mail-server",
                    templateUrl: "views/answering-machine.mail-server.html",
                    controller: "AnsweringMachineMailserverController",
                    data: {
                        module: "mailServerSettings"
                    }
                }
            }, {
                name: "user.voiceDevice",
                state: {
                    url: "/voice-device-info/:uid",
                    templateUrl: "views/voice.device-info.html",
                    controller: "VoiceDeviceController"
                }
            }, {
                name: "user.internetConnectivity",
                state: {
                    url: "/internetConnectivity",
                    templateUrl: "views/internet-connectivity.main.html"
                }
            }, {
                name: "user.internetConnectivity.ppp",
                state: {
                    url: "/ppp",
                    templateUrl: "views/internet-connectivity.ppp.html",
                    controller: "PPPController"
                }
            }, {
                name: "user.internetConnectivity.wan",
                state: {
                    url: "/wan",
                    templateUrl: "views/internet-connectivity.wan.html",
                    controller: "WANController",
                    data: {
                        module: "internetConnectivityWanAdvanced"
                    }
                }
            }, {
                name: "user.internetConnectivity.trafficSpeed",
                state: {
                    url: "/trafficSpeed",
                    templateUrl: "views/internet-connectivity.traffic-speed.html",
                    controller: "TrafficSpeedController"
                }
            }, {
                name: "user.internetConnectivity.3g",
                state: {
                    url: "/3g",
                    templateUrl: "views/internet-connectivity.3g.html",
                    controller: "Backup3gController"
                }
            }, {
                name: "user.internetConnectivity.qos",
                state: {
                    url: "/qos",
                    templateUrl: "views/internet-connectivity.qos.main.html",
                    data: {
                        module: "qos"
                    }
                }
            }, {
                name: "user.internetConnectivity.qos.configuration",
                state: {
                    url: "/configuration",
                    templateUrl: "views/internet-connectivity.qos.configuration.html",
                    controller: "QoSConfigurationController",
                    data: {
                        module: "qos"
                    }
                }
            }, {
                name: "user.internetConnectivity.qos.queueConfiguration",
                state: {
                    url: "/queueConfiguration",
                    templateUrl: "views/internet-connectivity.qos.queue-configuration.html",
                    controller: "QoSQueueController",
                    data: {
                        module: "qos"
                    }
                }
            }, {
                name: "user.internetConnectivity.qos.classification",
                state: {
                    url: "/classification",
                    templateUrl: "views/internet-connectivity.qos.classification.html",
                    controller: "QoSClassificationController",
                    data: {
                        module: "qos"
                    }
                }
            }, {
                name: "user.internetConnectivity.qos.policer",
                state: {
                    url: "/policer",
                    templateUrl: "views/internet-connectivity.qos.policer.html",
                    controller: "QoSPolicerController",
                    data: {
                        module: "qos"
                    }
                }
            }, {
                name: "user.internetConnectivity.basic",
                state: {
                    url: "/basic",
                    templateUrl: "views/internet-connectivity.basic.html",
                    data: {
                        module: "internetConnectivityWanBasic"
                    }
                }
            }, {
                name: "user.internetConnectivity.basic.ipv4",
                state: {
                    url: "/ipv4",
                    templateUrl: "views/internet-connectivity.ipv4.html",
                    controller: "SimpleController",
                    data: {
                        module: "internetConnectivityWanBasic"
                    }
                }
            }, {
                name: "user.internetConnectivity.ipv6",
                state: {
                    url: "/ipv6",
                    templateUrl: "views/internet-connectivity.ipv6.html"
                }
            }, {
                name: "user.internetConnectivity.basic.simpleIpv6",
                state: {
                    url: "/simpleIpv6",
                    templateUrl: "views/internet-connectivity.ipv6Simple.html",
                    controller: "SimpleIPv6Controller",
                    data: {
                        module: "simpleIpv6"
                    }
                }
            }, {
                name: "user.internetConnectivity.simpleIpv6",
                state: {
                    url: "/simpleIPv6",
                    templateUrl: "views/internet-connectivity.ipv6Simple.html",
                    controller: "SimpleIPv6Controller",
                    data: {
                        module: "simpleIPv6Main"
                    }
                }
            }, {
                name: "user.internetConnectivity.gpon",
                state: {
                    url: "/gpon",
                    templateUrl: "views/internet-connectivity.gpon.html",
                    controller: "GponController"
                }
            }, {
                name: "user.internetConnectivity.bridgemodeInternetPage",
                state: {
                    url: "/bridgemode",
                    templateUrl: "views/mysagemcombox.bridge-mode.html",
                    controller: "BridgeModeController",
                    data: {
                        module: "bridgemodeInternetPage"
                    }
                }
            }, {
                name: "user.sip",
                state: {
                    url: "/sip-settings",
                    templateUrl: "views/sip-settings.main.html",
                    data: {
                        module: "sip"
                    }
                }
            }, {
                name: "user.sip.telephones",
                state: {
                    url: "/telephones-matrix",
                    templateUrl: "views/sip-telephones.matrix.html",
                    controller: "TelephonesMatrixController"
                }
            }, {
                name: "user.sip.callsettings",
                state: {
                    url: "/call-settings",
                    templateUrl: "views/sip-settings.call-settings.html",
                    controller: "CallBlockingController"
                }
            }, {
                name: "user.sip.settings",
                state: {
                    url: "/settings",
                    templateUrl: "views/sip-settings.settings.html",
                    controller: "SipSettingsController"
                }
            }, {
                name: "user.inTwo",
                state: {
                    url: "/inTwo",
                    templateUrl: "views/intwo-main.html"
                }
            }, {
                name: "user.webradio",
                state: {
                    url: "/web-radio",
                    templateUrl: "views/webradio.html"
                }
            }, {
                name: "user.inTwo.device",
                state: {
                    url: "/device",
                    templateUrl: "views/intwo-device.html"
                }
            }, {
                name: "user.inTwo.settings",
                state: {
                    url: "/settings",
                    templateUrl: "views/intwo-settings.html"
                }
            }, {
                name: "user.dect",
                state: {
                    url: "/dect",
                    templateUrl: "views/dect.main.html"
                }
            }, {
                name: "user.dect.basic",
                state: {
                    url: "/basic",
                    templateUrl: "views/dect.basic.html",
                    controller: "DectBasicController"
                }
            }, {
                name: "user.dect.advanced",
                state: {
                    url: "/advanced",
                    templateUrl: "views/dect.advanced.html",
                    controller: "DectAdvancedController",
                    data: {
                        module: "dectAdvanced"
                    }
                }
            }, {
                name: "user.dectHandset",
                state: {
                    url: "/dectHandset/:uid",
                    templateUrl: "views/dect.handset.main.html",
                    controller: "DectHandsetMainController"
                }
            }, {
                name: "user.dectHandset.handset",
                state: {
                    url: "/handset",
                    templateUrl: "views/dect.handset.handset.html",
                    controller: "DectHandsetController"
                }
            }, {
                name: "user.dectHandset.advanced",
                state: {
                    url: "/advanced",
                    templateUrl: "views/dect.handset.advanced.html",
                    controller: "DectHandsetController"
                }
            }, {
                name: "user.scheduling",
                state: {
                    url: "/scheduling/:scheduleType/:mode",
                    templateUrl: "views/scheduling.main.html",
                    controller: "SchedulingMainController"
                }
            }, {
                name: "user.scheduling.control",
                state: {
                    url: "/control/",
                    templateUrl: "views/scheduling.control.html",
                    controller: "SchedulingController"
                }
            }],
            admin: [{
                name: "admin",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b.admin
                    }
                }
            }],
            onu: [{
                name: "onu",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b.admin
                    }
                }
            }],
            internal: [{
                name: "internal",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b.internal
                    }
                }
            }],
            poweruser: [{
                name: "poweruser",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b.internal
                    }
                }
            }],
            mso: [{
                name: "mso",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b.mso
                    }
                }
            }],
            voip: [{
                name: "voip",
                state: {
                    "abstract": !0,
                    templateUrl: "views/base.html",
                    data: {
                        access: b.voip
                    }
                }
            }]
        },
        mobile: {}
    }
}
;
var profile = {
    talktalk: {
        expertMode: !1,
        cssTheme: "styles/themes/talktalk-theme.css",
        cssLogin: "styles/login-talktalk-simple.css",
        title: "TalkTalk",
        globalWaitPosition: "top",
        allowedLanguages: {
            "default": ["EN"]
        },
        languageDropDownList: !1,
        blockedUsers: [],
        blockedSecurityModes: [],
        allowedUsers: ["admin"],
        favicon: "images/talktalk/talktalk-favicon.png",
        simplePage: "views/main-simple-talktalk.html",
        mainPage: "views/main-talktalk.html",
        headerModel: "",
        simpleLogin: !1,
        partnerUrl: "http://talktalk.co.uk",
        staticUserLogin: !1,
        simpleMaintenance: !1,
        hasExternalHelp: !0,
        suggestChangeDefaultPassword: !1,
        showInactiveDevices: !1,
        showAllPlcDevices: !1,
        reverseHeaderControls: !1,
        onChangeSave: !1,
        hasIPCP: !0,
        ipcpDNS: !0,
        modules: {
            staticDNS: !1,
            dyndns: {
                showIpv4Address: !1
            },
            dropboxRestrictMode: !1,
            simpleUserPage: !0,
            textPassword: !1,
            main: {
                xpathForProductName: "Device/DeviceInfo/ProductClass",
                showAllDevices: !1,
                showIpv6Address: !1,
                checkBridgeMode: !1
            },
            phonebook: {
                allowDuplicatedNumber: !0
            },
            useNewDHCPXpath: !1,
            hasMenuVertical: !1,
            myBox: {
                deviceInfo: {
                    modelName: !1,
                    maxLines: 2
                },
                deviceTypes: [{
                    type: "MISCELLANEOUS",
                    icon: "miscellaneous"
                }, {
                    type: "COMPUTER",
                    icon: "pc"
                }, {
                    type: "PHONE",
                    icon: "smartphone"
                }, {
                    type: "NETWORKACCESSPOINT",
                    icon: "nap"
                }, {
                    type: "AUDIOVIDEO",
                    icon: "audiovideo"
                }, {
                    type: "NOTEBOOKS",
                    icon: "notebook"
                }, {
                    type: "GAMECONSOLE",
                    icon: "game"
                }, {
                    type: "BLACKLISTED",
                    icon: "blacklisted"
                }, {
                    type: "PRINTER",
                    icon: "printer"
                }, {
                    type: "TABLET",
                    icon: "tablet"
                }, {
                    type: "TV_DECODER",
                    icon: "tv"
                }, {
                    type: "WIFI_BRIDGE",
                    icon: "wifibridge"
                }, {
                    type: "Camera",
                    icon: "camera"
                }, {
                    type: "WIFI_REPEATER",
                    icon: "wifirepeater"
                }],
                dhcp: {
                    defaultValues: {
                        dhcpEnable: !0,
                        gatewayIp: "192.168.1.1",
                        subnetMask: "255.255.255.0",
                        ipv4PoolStart: "192.168.1.64",
                        ipv4PoolEnd: "192.168.1.253",
                        ipv4Lease: 86400,
                        ipv4TvPoolEnable: !0,
                        ipv4TvPoolStart: "192.168.1.64",
                        ipv4TvPoolEnd: "192.168.1.127",
                        dhcpAuthoritative: !0,
                        hostNameUpdate: !1
                    },
                    updateDNS: !1,
                    updateGuestDNS: !1,
                    ipv4DefaultGwInput: "input",
                    predefinedIpRange: null,
                    ipv4LeaseInput: "text"
                },
                statistics: {
                    accordion: !0,
                    ethernetBitrate: "AUTO"
                },
                maintenance: {
                    horizontalTabs: !1
                }
            },
            wifi: {
                dual: !1,
                wirelessEnvironmentCount: !1,
                wifi5MasterRadio: !1,
                wifiSSIDInclusive: !0,
                vmmHidenWifiModeACandN: !1,
                wifi5: {
                    channelBandwidthSelectFilter: !1,
                    blockedChannelsByBandwidth: {
                        "40MHZ": [140],
                        "80MHZ": [132, 136, 140]
                    }
                },
                wps: {
                    configMethodXpath: "configMethodsSupported",
                    overrideMethods: null
                },
                oneRequestOnly: !1,
                oneRequestOnlyPriv: !1,
                oneRequestOnlyForWPS: !1,
                radioOnly: !1,
                wirelessKeyRules: {},
                wifiAliases: {},
                blockedSecurityModesByStandards: {}
            },
            phonebookImport: {
                permittedUrls: ["f5360", "f5360.home", "192.168.1.1"]
            },
            accessControl: {
                parentalControlService: "ParentalControl",
                remoteAccess: {
                    blockedModes: ["ssh"]
                },
                user: {
                    editHierarchy: {}
                },
                gatewayTime: !1,
                removeUPNPRules: !1,
                removeUPNPIGd: !0
            },
            internetConnectivity: {
                editStaticIp: !0,
                showAddressingType: !0,
                linkGoHome: !1,
                newDelegatedPrefix: !1,
                addressingTypePPP: !1,
                showStaticFields: !1,
                hideOnFTTH: !0,
                DNSManager: !0,
                defaultRoute: !1,
                interfaceTypeAll: !1,
                disabledOnADSL: !0,
                disabledOnVDSL: !0
            },
            SIPsettings: {
                profileDefaultValues: {
                    enable: !1,
                    localSelection: "DK",
                    voipDialpan: "(*x#|*xx#|*33*xxxxx#|*74*xxx.T|*75*xxx.T|*xx*xxxxx.#|*#xx#|#xx#|#33*xxxx#|00xxxxx.T|10xx11x|10xxxxxxx.T|116xxx|11xT|18xx|1[6-9]x.T|[2-9]xxxxxxx)",
                    sipProxyAddress: "",
                    sipProxyPort: 5060,
                    sipOutboundAddress: "",
                    sipOutboundInternalAddress: "",
                    sipOutboundPort: 5060,
                    sipUserAgentAddress: "",
                    sipUserAgentPort: 5060,
                    sipRegisterAddress: "",
                    sipRegisterPort: 5060,
                    enableT38: !1,
                    registrationExpireTimeout: 1800,
                    registrationRetryInterval: 240,
                    dscpSIP: "",
                    dscpRTP: "",
                    dtmfRelay: "",
                    hookFlashRelay: "",
                    sipTrasportProtocol: "",
                    cidSignalProtocol: "",
                    enableSipTagMatching: "",
                    musicServer: "",
                    musicServerPort: ""
                }
            },
            fon: {
                SSIDProfiles: []
            },
            reinitializeWithFactory: !0,
            showConnectionFrequency: !1,
            portForwarding: {
                rulesNotEditable: ["HIDDEN"],
                rulesNotRemovable: ["UPNP", "HIDDEN"],
                rulesNotDisplayed: []
            },
            tvBox: {
                name: ""
            },
            powerDigitAfter: {
                enable: !0
            },
            dsl: {
                displayVlanIdVDSL: !0
            }
        },
        showedpages: {
            lanIpv6AddressAutoconfiguration: {
                enable: !0
            },
            tabGeneral: {
                enable: !0
            },
            firewallButtonsCustom: {
                enable: !1
            },
            driverVersion: {
                enable: !1
            },
            charter5280: {
                enable: !1
            },
            wifibackhaul: {
                enable: !1
            },
            talktalk: {
                enable: !0
            },
            quickSetupWizard: {
                enable: !1
            },
            sunrise: {
                enable: !1
            },
            internetUtilitiesTR69: {
                enable: !1
            },
            landPage: {
                enable: !1
            },
            firstInstall: {
                enable: !1
            },
            firstInstallMaintenance: {
                enable: !1
            },
            firstInstallWizard: {
                enable: !1
            },
            duplexMode: {
                enable: !1
            },
            checkValidHost: {
                enable: !1
            },
            mobile: {
                enable: !0
            },
            mobileLinks: {
                enable: !0
            },
            logo: {
                enable: !0
            },
            logoLinkToSagemcom: {
                enable: !1
            },
            logoWait: {
                enable: !0
            },
            modelAndFirmwareVersionHeader: {
                enable: !1
            },
            mobileWifiSchedule: {
                enable: !0
            },
            mobileWifiStrength: {
                enable: !0
            },
            mobileGuest: {
                enable: !0
            },
            mobileMyMedia: {
                enable: !1
            },
            intwo: {
                enable: !0
            },
            webradio: {
                enable: !1
            },
            myCloud: {
                enable: !1
            },
            qrCodes: {
                enable: !1
            },
            mfpMode: {
                enable: !1
            },
            BoBStatus: {
                enable: !1
            },
            voicePorts: {
                enable: !1
            },
            social: {
                enable: !1
            },
            twonkyLink: {
                enable: !0
            },
            voipLink: {
                enable: !1
            },
            phonebook: {
                enable: !1
            },
            phonebookcall: {
                enable: !1
            },
            callLogCallOption: {
                enable: !0
            },
            phonebookAddShowNumber: {
                enable: !0
            },
            answeringMachine: {
                enable: !0
            },
            sip: {
                enable: !0
            },
            lineDetails: {
                enable: !0
            },
            telephoneMatrix: {
                enable: !0
            },
            showTabTelephoneMatrix: {
                enable: !0
            },
            callSettings: {
                enable: !1
            },
            callForwarding: {
                enable: !0
            },
            callForwardingVoicemail: {
                enable: !1
            },
            callSettingsDebug: {
                enable: !0
            },
            callSettingsAdvanced: {
                enable: !0
            },
            callSettingsAdvancedStatus: {
                enable: !1
            },
            callWaitingAdvanced: {
                enable: !1
            },
            manageLineURI: {
                enable: !0
            },
            ecoMode: {
                enable: !1
            },
            route: {
                enable: !0
            },
            monitoring: {
                enable: !1
            },
            lanIpv6: {
                enable: !1
            },
            dhcppdSection: {
                enable: !0
            },
            lanIpv4: {
                enable: !0,
                rename: "DHCP"
            },
            dhcpEnable: {
                enable: !0
            },
            natSettings: {
                enable: !1
            },
            lanIpv4TvPool: {
                enable: !1
            },
            ipReservation: {
                enable: !0
            },
            ipLeaseTime: {
                enable: !1
            },
            restoreDhcp: {
                enable: !1
            },
            restoreConfig: {
                enable: !0
            },
            datapump: {
                enable: !1
            },
            statistics: {
                enable: !1
            },
            statisticsLan: {
                enable: !0
            },
            statisticsWanLayer3: {
                enable: !0
            },
            statisticsWanLayer2: {
                enable: !0
            },
            statisticsWanLayer1: {
                enable: !0
            },
            statisticsWanFTTH: {
                enable: !0
            },
            cableModemConnection: {
                enable: !1
            },
            cableModemConfiguration: {
                enable: !1
            },
            dhcpLeases: {
                enable: !1
            },
            dhcpIPv6InDHCP: {
                enable: !1
            },
            routerAdvertisementConfig: {
                enable: !1
            },
            arpTable: {
                enable: !1
            },
            myMedia: {
                enable: !1,
                rename: "Media"
            },
            myMediaExtras: {
                enable: !1
            },
            bkpRestore: {
                enable: !0
            },
            firmwareUpgrade: {
                enable: !0
            },
            ntp: {
                enable: !0
            },
            tr69: {
                enable: !0
            },
            tr069SSLAuthentication: {
                enable: !1
            },
            internetUtilities: {
                enable: !1
            },
            logs: {
                enable: !0
            },
            securitylog: {
                enable: !1
            },
            upnplog: {
                enable: !1
            },
            operatorlog: {
                enable: !0
            },
            systemLog: {
                enable: !1
            },
            ping: {
                enable: !0
            },
            dnsQuery: {
                enable: !0
            },
            traceroute: {
                enable: !0
            },
            hasDestinationInTraceRoute: {
                enable: !1
            },
            healthCheck: {
                enable: !1
            },
            parentalControl: {
                enable: !1
            },
            parentalControlTimeslot: {
                enable: !1
            },
            parentalControlDevice: {
                enable: !1
            },
            portTriggering: {
                enable: !1
            },
            firewall: {
                enable: !0
            },
            firewallDevice: {
                enable: !0
            },
            firewallRespondToPing: {
                enable: !0
            },
            ipv6Pinholling: {
                enable: !1
            },
            firewallIPv6: {
                enable: !1
            },
            firstIPv6DNS: {
                enable: !0
            },
            secondIPv6DNS: {
                enable: !0
            },
            certificates: {
                enable: !1
            },
            VPN: {
                enable: !1
            },
            parentalControlOlfeo: {
                enable: !0
            },
            gamesAndApps: {
                enable: !0
            },
            selectUserPasswordChange: {
                enable: !0
            },
            internetConnectivityWanAdvanced: {
                enable: !1
            },
            internetConnectivityWanBasic: {
                enable: !0,
                rename: "Basic"
            },
            ipv4IptvSection: {
                enable: !1
            },
            ipv4VoipSection: {
                enable: !1
            },
            forceEditConnectionType: {
                enable: !0
            },
            manageVLAN: {
                enable: !0
            },
            vpivci: {
                enable: !0
            },
            vlandId: {
                enable: !0
            },
            trafficSpeed: {
                enable: !1
            },
            trafficSpeedGauge: {
                enable: !0
            },
            qos: {
                enable: !1
            },
            "3gLTEBackup": {
                enable: !0
            },
            docsis: {
                enable: !0
            },
            docsisRfparams: {
                enable: !1
            },
            docsisMTA: {
                enable: !1
            },
            backup3gLTE: {
                enable: !1,
                implementation: "hsxpalte"
            },
            enableBackup3gLTE: {
                enable: !1
            },
            dongleVersionBackup3g: {
                enable: !1
            },
            simpleIpv4: {
                enable: !0
            },
            authMethod3G: {
                enable: !0
            },
            pukCode3G: {
                enable: !0
            },
            simpleIpv6: {
                enable: !1
            },
            simpleIPv6Main: {
                enable: !1
            },
            ipv6: {
                enable: !1
            },
            DHCPv6Server: {
                enable: !1
            },
            wakeOnLan: {
                enable: !0
            },
            lanVlan: {
                enable: !0
            },
            wifi5g: {
                enable: !0
            },
            wifi24g: {
                enable: !0
            },
            wifiBasic: {
                enable: !0
            },
            wifiWPS: {
                enable: !0
            },
            wifiStats: {
                enable: !1
            },
            wifiAdvanced: {
                enable: !0
            },
            wifiCountry: {
                enable: !1
            },
            wifiTransmitPower: {
                enable: !1
            },
            wifiMacFilter: {
                enable: !0
            },
            wifiIsolation: {
                enable: !1
            },
            cyclicPrefix: {
                enable: !1
            },
            wirelessEnvironment: {
                enable: !1
            },
            wirelessRecommendedChannel: {
                enable: !1
            },
            communSettingsGuest: {
                enable: !1
            },
            wirelessFullAdvanced: {
                enable: !1
            },
            wirelessScheduling: {
                enable: !1
            },
            wirelessGuestSSID: {
                enable: !1
            },
            wirelessWDS: {
                enable: !1
            },
            wirelessMSO: {
                enable: !1
            },
            remoteAccess: {
                enable: !1
            },
            remoteAccessLanOption: {
                enable: !1
            },
            remoteAccessWifiOption: {
                enable: !1
            },
            remoteAccessWanOption: {
                enable: !1
            },
            remoteAccessTrustedIP: {
                enable: !1
            },
            remoteAccessVoipOption: {
                enable: !1
            },
            remoteAccessVoipAddress: {
                enable: !1
            },
            userAccess: {
                enable: !0
            },
            userAccessMaintenance: {
                enable: !1
            },
            remoteAccessChangeUser: {
                enable: !0
            },
            dns: {
                enable: !0
            },
            showdnsinfo: {
                enable: !0
            },
            led: {
                enable: !0
            },
            ledMode: {
                enable: !1
            },
            dyndns: {
                enable: !0
            },
            portForwarding: {
                enable: !0
            },
            portForwardNatButton: {
                enable: !1
            },
            portForwardingDevice: {
                enable: !0
            },
            portForwardingUpnpReadOnly: {
                enable: !0
            },
            dmz: {
                enable: !0
            },
            dmzDevice: {
                enable: !0
            },
            natMapping: {
                enable: !0
            },
            sipDebug: {
                enable: !1
            },
            sipRegistrationExpireTimeout: {
                enable: !0
            },
            sipForceDtmfBand: {
                enable: !0
            },
            sipFlashHookEnable: {
                enable: !0
            },
            autodimming: {
                enable: !1
            },
            gpon: {
                enable: !0
            },
            wifiSignalStrength: {
                enable: !0
            },
            internetSpeed: {
                enable: !0
            },
            dectSchedule: {
                enable: !1
            },
            wifiSchedule: {
                enable: !1
            },
            ledsSchedule: {
                enable: !1
            },
            passwordTipLogin: {
                enable: !1
            },
            slideShowTitleLogin: {
                enable: !0
            },
            displayLoginSlideShow: {
                enable: !0
            },
            loginTitle: {
                enable: !1
            },
            usb: {
                enable: !1
            },
            usbEjectButton: {
                enable: !1
            },
            wpsMode: {
                enable: !1
            },
            bridgemode: {
                enable: !1
            },
            bridgemodeInternetPage: {
                enable: !1
            },
            bridgeModeConnectionType: {
                enable: !1
            },
            trafficHistory: {
                enable: !0
            },
            lte3gBackupApnParams: {
                enable: !0
            },
            quickView: {
                enable: !0
            },
            lineCallHistory: {
                enable: !0
            },
            ringTest: {
                enable: !0
            },
            mailServerSettings: {
                enable: !1
            },
            wifiTV: {
                enable: !1
            },
            walledGarden: {
                enable: !1
            },
            dmzIPv6: {
                enable: !1
            },
            ipv6DefaultRangeAddress: {
                enable: !1
            },
            deviceInfoPreLogin: {
                enable: !0
            },
            stbManufaturer: {
                enable: !0
            },
            statisticsSFP: {
                enable: !0
            },
            massStorageUSB: {
                enable: !1
            },
            wifi24Schedule: {
                enable: !1
            },
            wifi5Schedule: {
                enable: !1
            },
            wifiDualTabs: {
                enable: !1
            },
            homeWiFiMerge: {
                enable: !1
            },
            headerControlsWifi: {
                enable: !1
            },
            showAddressingTypeSelect: {
                enable: !0
            },
            PPPoePassthrough: {
                enable: !1
            },
            loginOte: {
                enable: !1
            },
            nowifi: {
                enable: !0
            },
            isCable: {
                enable: !1
            },
            dnsIPv6: {
                enable: !0
            },
            dnsIPv4: {
                enable: !0
            },
            dns1IPv4: {
                enable: !0
            },
            dns2IPv4: {
                enable: !0
            },
            wifiGuestRecommendChannel: {
                enable: !0
            },
            showIPSecPPTP: {
                enable: !1
            },
            CPULoadField: {
                enable: !1
            },
            memoryField: {
                enable: !1
            },
            usDsDisplay: {
                enable: !0
            },
            globalSip: {
                enable: !1
            },
            portMirror: {
                enable: !1
            },
            ssidCreation: {
                enable: !1
            },
            pingInterface: {
                enable: !1
            },
            advancedVoIPSettings: {
                enable: !0
            },
            isSiminn: {
                enable: !1
            },
            masmovil: {
                enable: !1
            },
            mptcp: {
                enable: !1
            },
            dhcpEnablev6: {
                enable: !1
            },
            ianaEnable: {
                enable: !1
            },
            IAPDEnable: {
                enable: !1
            },
            ulaIPv6Enabled: {
                enable: !1
            },
            lanIPv6LinkLocal: {
                enable: !0
            },
            ianaManualPrefixes: {
                enable: !1
            },
            DTMFTransmissionMode: {
                enable: !1
            },
            networkConfiguration: {
                enable: !1
            },
            wirelessEnableATF: {
                enable: !1
            },
            rejectRuleEnable: {
                enable: !1
            },
            statusBackup3gLTE: {
                enable: !0
            },
            mobTechStatusBackup3gLTE: {
                enable: !0
            },
            apnBackup3g: {
                enable: !1
            },
            daylightSavingTime: {
                enable: !1
            },
            wifi24Speed: {
                enable: !0
            },
            wifi5Speed: {
                enable: !0
            },
            DLNA: {
                enable: !0
            },
            MTU: {
                enable: !1
            },
            connectionServices: {
                enable: !1
            },
            pinCode3g: {
                enable: !0
            },
            busyOnBusy: {
                enable: !0
            },
            statusReason: {
                enable: !0
            },
            lineCallWaiting: {
                enable: !0
            },
            lineMailbox: {
                enable: !0
            },
            networkSettings: {
                enable: !1
            },
            ledDimmedMode: {
                enable: !1
            },
            antennaSettings: {
                enable: !1
            },
            displayPassword: {
                enable: !0
            },
            validateBlacklistedPort: {
                enable: !1
            },
            ipv4OnlineDuration: {
                enable: !0
            },
            ipVersionStatus: {
                enable: !0
            },
            statusDDns: {
                enable: !0
            },
            statisticsEthenet: {
                enable: !1
            },
            statisticsType: {
                enable: !1
            },
            enableWMM: {
                enable: !0
            },
            wifiShowCurrentBandwidth: {
                enable: !1
            },
            lanPort4BridgeModeConfirmMsg: {
                enable: !0
            },
            licenses: {
                enable: !1
            },
            mobileOpBackup3g: {
                enable: !1
            },
            imsiBackup3g: {
                enable: !1
            },
            msisdnBackup3g: {
                enable: !1
            },
            imeiDeviceInfo: {
                enable: !1
            },
            hostnameReadOnly: {
                enable: !1
            },
            myMediaHiddenSharedName: {
                enable: !1
            },
            layerInterfaceMainPage: {
                enable: !1
            },
            showlte: {
                enable: !1
            },
            avoidValidateOnAddReserveIP: {
                enable: !0
            }
        },
        globals: {
            mySagemcomBox: {
                EN: "TalkTalk Wi-Fi Hub",
                FR: "TalkTalk Box",
                SPN: "TalkTalk Box",
                DE: "TalkTalk Box",
                IT: "TalkTalk Box",
                DA: "TalkTalk Box",
                AR: "TODO"
            },
            login_user_label: {
                EN: "Router Username:",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            login_pass_label: {
                EN: "Router Password:",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            wanMACAddress: {
                EN: "MAC Address",
                FR: "TODO",
                SPN: "TODO",
                DE: "MAC-Adresse",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            serialNumber: {
                EN: "Serial Number",
                FR: "TODO",
                SPN: "TODO",
                DE: "Seriennummer",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            uptime: {
                EN: "System Up Time",
                FR: "TODO",
                SPN: "TODO",
                DE: "Systemlaufzeit",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            welcome: {
                EN: "Welcome to",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            pleaseWaitLoading: {
                EN: "We’re just loading your dashboard.",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            passwordDoesntMatch: {
                EN: "Confirm password does not match",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            pleaseWaitLoadingTop: {
                EN: "",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            pleaseWaitButton: {
                EN: "Please Wait...",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO"
            },
            basicMode: {
                EN: "Back to Dashboard",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            dataPath: {
                EN: "Data Path",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            interLeaveDepth: {
                EN: "Interleave Depth",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            interLeaveDelay: {
                EN: "Interleave Delay",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            inp: {
                EN: "INP",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            lossOfSignal: {
                EN: "Loss of Signal",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            firmwareVersions: {
                EN: "Firmware Version",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            currentProfile: {
                EN: "Current Profile",
                FR: "TODO",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            linkEncapsulation: {
                EN: "Link Encapsulation",
                FR: "Encapsulation du Lien",
                SPN: "Encapsulación de Enlace",
                DE: "Encapsulation der Verbindung",
                IT: "Incapsulazione Link",
                DA: "Linkindkapsling",
                AR: "تغليف الرابط",
                PT: "Encapsulaçao do Link",
                RO: "TODO",
                IND: "TODO"
            },
            selectDebug: {
                EN: "Debug or lower",
                FR: "Debug ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            selectInfo: {
                EN: "Info or lower",
                FR: "Info ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            selectNotice: {
                EN: "Notice or lower",
                FR: "Avis ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            selectWarning: {
                EN: "Warning or lower",
                FR: "Avertissement ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            selectError: {
                EN: "Error or lower",
                FR: "Erreur ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            selectCrit: {
                EN: "Critical or lower",
                FR: "Critique ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            selectAlert: {
                EN: "Alert or lower",
                FR: "Alerte ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            },
            selectEmergency: {
                EN: "Emergency or lower",
                FR: "Urgent ou inférieur",
                SPN: "TODO",
                DE: "TODO",
                IT: "TODO",
                DA: "TODO",
                AR: "TODO",
                PT: "TODO",
                RO: "TODO",
                IND: "TODO"
            }
        },
        routes: function(a) {
            return {
                desktop: {
                    "public": [{
                        name: "public",
                        state: {
                            "abstract": !0,
                            templateUrl: "views/base-simple-talktalk.html",
                            data: {
                                access: a["public"]
                            }
                        }
                    }, {
                        name: "public.404",
                        state: {
                            url: "/404/",
                            templateUrl: "404.html"
                        }
                    }, {
                        name: "public.blockedAccess",
                        state: {
                            url: "/blockedAccess/",
                            templateUrl: "views/blocked-access.html",
                            controller: "BlockedAccessController"
                        }
                    }],
                    anon: [{
                        name: "anon",
                        state: {
                            "abstract": !0,
                            template: "<ui-view/>",
                            data: {
                                access: a.anon
                            }
                        }
                    }, {
                        name: "anon.login",
                        state: {
                            url: "/login/:user",
                            templateUrl: this.simpleLogin ? "views/base.html" : "views/login-simple-talktalk.html",
                            controller: "LoginController"
                        }
                    }, {
                        name: "anon.login.simple",
                        state: {
                            url: "/credentials",
                            templateUrl: "views/loginSimple.html",
                            controller: "LoginController"
                        }
                    }, {
                        name: "anon.androidHelp",
                        state: {
                            url: "/androidHelp/",
                            templateUrl: "views/android-help.html",
                            controller: "LoginController"
                        }
                    }, {
                        name: "anon.mysagemcombox",
                        state: {
                            "abstract": !0,
                            url: "/mybox",
                            templateUrl: "views/base.html"
                        }
                    }, {
                        name: "anon.mysagemcombox.deviceInfo",
                        state: {
                            url: "/deviceInfo",
                            templateUrl: "views/mysagemcombox.simple-main.html"
                        }
                    }],
                    user: [{
                        name: "user",
                        state: {
                            "abstract": !0,
                            templateUrl: "views/base-simple-talktalk.html",
                            data: {
                                access: a.guest
                            }
                        }
                    }, {
                        name: "user.simple",
                        state: {
                            url: "/simple",
                            "abstract": !0,
                            templateUrl: "views/baseSimple.html"
                        }
                    }, {
                        name: "user.simple.home",
                        state: {
                            url: "/dashboard",
                            templateUrl: "views/main-simple-talktalk.html",
                            controller: "ConnectedDevicesController"
                        }
                    }, {
                        name: "user.simple.internet",
                        state: {
                            url: "/internet",
                            controller: "ConnectedDevicesController",
                            data: {
                                title: "my_internet_connection"
                            },
                            templateUrl: "views/internet-connection-talktalk.html"
                        }
                    }, {
                        name: "user.simple.wifi",
                        state: {
                            url: "/wifi",
                            controller: "WifiSimpleWizardController",
                            templateUrl: "views/wifi-simple-talktalk.html"
                        }
                    }, {
                        name: "user.simple.devices",
                        state: {
                            url: "/devices",
                            controller: "ConnectedDevicesController",
                            templateUrl: "views/my-devices-simple-talktalk.html"
                        }
                    }, {
                        name: "user.homefirst",
                        state: {
                            url: "/firstAccess",
                            templateUrl: "views/first-access.html",
                            controller: "FirstAccessController"
                        }
                    }, {
                        name: "user.homefirst.user",
                        state: {
                            url: "/user",
                            templateUrl: "views/first-access.user.html",
                            controller: "AccessControlUserController"
                        }
                    }, {
                        name: "user.homefirst.connection",
                        state: {
                            url: "/InternetSetup",
                            templateUrl: "views/myRepublic/first-access.setup.html",
                            controller: "SimpleController"
                        }
                    }, {
                        name: "user.homefirst.ppp",
                        state: {
                            url: "/InternetSetup",
                            templateUrl: "views/myRepublic/first-access.setup.html",
                            controller: "SimpleController"
                        }
                    }, {
                        name: "user.homefirst.wifi",
                        state: {
                            url: "/wifi/:radio/:firstAccessPPP",
                            templateUrl: "views/first-access.wifi.html",
                            controller: "WiFiBasicController"
                        }
                    }, {
                        name: "user.homefirst.end",
                        state: {
                            url: "/summary",
                            templateUrl: "views/myRepublic/first-access.end.html",
                            controller: "EndController"
                        }
                    }, {
                        name: "user.home",
                        state: {
                            url: "/",
                            templateUrl: this.mainPage || "views/main-simple-talktalk.html",
                            controller: "ConnectedDevicesController"
                        }
                    }, {
                        name: "user.mysagemcombox",
                        state: {
                            url: "/mybox",
                            templateUrl: "views/mysagemcombox.main.html"
                        }
                    }, {
                        name: "user.mysagemcombox.deviceInfo",
                        state: {
                            url: "/deviceInfo",
                            templateUrl: "views/mysagemcombox.device-info.main.html"
                        }
                    }, {
                        name: "user.mysagemcombox.dhcp",
                        state: {
                            url: "/DHCP",
                            templateUrl: "views/mysagemcombox.dhcp.html",
                            controller: "DhcpController",
                            data: {
                                module: "lanIpv4"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.deviceInfo.dhcpLeases",
                        state: {
                            url: "/dhcpLeases",
                            templateUrl: "views/mysagemcombox.device-info.dhcp-leases.html",
                            controller: "DhcpLeasesController",
                            data: {
                                module: "dhcpLeases"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.deviceInfo.statistics",
                        state: {
                            url: "/statistics",
                            templateUrl: "views/mysagemcombox.device-info.statistics.html",
                            controller: "StatisticsController",
                            data: {
                                module: "statistics"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.deviceInfo.arp",
                        state: {
                            url: "/arp",
                            templateUrl: "views/mysagemcombox.device-info.arp.html",
                            controller: "ARPController",
                            data: {
                                module: "arpTable"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.deviceInfo.deviceInfo",
                        state: {
                            url: "/deviceInfo",
                            templateUrl: "views/mysagemcombox.device-info.device-info.html",
                            controller: "DeviceInformationController"
                        }
                    }, {
                        name: "user.mysagemcombox.mass-storage",
                        state: {
                            url: "/mass-storage/",
                            templateUrl: "views/mysagemcombox.mass-storage.html",
                            controller: "MassStorageController"
                        }
                    }, {
                        name: "user.mysagemcombox.dns",
                        state: {
                            url: "/dns",
                            templateUrl: "views/mysagemcombox.dns.main.html"
                        }
                    }, {
                        name: "user.mysagemcombox.dns.server",
                        state: {
                            url: "/server",
                            templateUrl: "views/mysagemcombox.dns.server.html",
                            controller: "DnsServerController"
                        }
                    }, {
                        name: "user.mysagemcombox.ddns",
                        state: {
                            url: "/ddns",
                            templateUrl: "views/mysagemcombox.ddns.html",
                            controller: "DdnsController",
                            data: {
                                module: "dyndns"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.walledgarden",
                        state: {
                            url: "/walledgarden",
                            templateUrl: "views/mysagemcombox.walled-garden.html",
                            controller: "WalledGardenController",
                            data: {
                                module: "walledgarden"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance",
                        state: {
                            url: "/maintenance",
                            controller: "MaintenanceMainController",
                            templateUrl: this.simpleMaintenance ? "views/mysagemcombox.maintenance.mainSimple.html" : "views/mysagemcombox.maintenance.main.html"
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.reset",
                        state: {
                            url: "/reset",
                            templateUrl: "views/mysagemcombox.maintenance.reset.html",
                            controller: "MaintenanceResetController"
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.log",
                        state: {
                            url: "/log",
                            templateUrl: "views/mysagemcombox.maintenance.log.main.html"
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.log.systemlog",
                        state: {
                            url: "/system-log",
                            templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                            controller: "MaintenanceSystemLogController"
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.log.operatorlog",
                        state: {
                            url: "/operator-log",
                            templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                            controller: "MaintenanceSystemLogController",
                            data: {
                                type: "operator"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.log.securitylog",
                        state: {
                            url: "/security-log",
                            templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                            controller: "MaintenanceSystemLogController",
                            data: {
                                type: "firewall"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.log.upnplog",
                        state: {
                            url: "/upnp-log",
                            templateUrl: "views/mysagemcombox.maintenance.system-log.html",
                            controller: "MaintenanceSystemLogController",
                            data: {
                                type: "upnp"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.tr69",
                        state: {
                            url: "/tr69",
                            templateUrl: "views/mysagemcombox.maintenance.tr69.html",
                            controller: "MaintenanceTr69Controller"
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.firmwareUpdate",
                        state: {
                            url: "/firmware-update",
                            templateUrl: "views/mysagemcombox.maintenance.firmware-update.html",
                            controller: "MaintenanceResetController"
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.bkpRestore",
                        state: {
                            url: "/backup-restore",
                            templateUrl: "views/mysagemcombox.maintenance.bkpRestore.html",
                            controller: "MaintenanceResetController",
                            data: {
                                module: "bkpRestore"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.ntp",
                        state: {
                            url: "/ntp",
                            templateUrl: "views/mysagemcombox.maintenance.ntp.html",
                            controller: "NTPController",
                            data: {
                                module: "ntp"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.healthCheck",
                        state: {
                            url: "/healthCheck",
                            templateUrl: "views/mysagemcombox.maintenance.health-check.html",
                            controller: "MaintenanceHealthCheckController"
                        }
                    }, {
                        name: "user.mysagemcombox.maintenance.firstInstall",
                        state: {
                            url: "/firstInstall",
                            templateUrl: "views/mysagemcombox.maintenance.first-install.html"
                        }
                    }, {
                        name: "user.mysagemcombox.autodimming",
                        state: {
                            url: "/autodimming",
                            templateUrl: "views/mysagemcombox.autodimming.html",
                            controller: "AutoDimmingController"
                        }
                    }, {
                        name: "user.mysagemcombox.monitor",
                        state: {
                            url: "/monitor",
                            templateUrl: "views/mysagemcombox.monitor.main.html"
                        }
                    }, {
                        name: "user.mysagemcombox.monitor.quick",
                        state: {
                            url: "/:monitorTab",
                            templateUrl: "views/mysagemcombox.monitor.quick.html",
                            controller: "BandWidthMonitoringController"
                        }
                    }, {
                        name: "user.mysagemcombox.monitor.traffic",
                        state: {
                            url: "/history/:monitorTab",
                            templateUrl: "views/mysagemcombox.monitor.traffic.html",
                            controller: "BandWidthMonitoringController"
                        }
                    }, {
                        name: "user.mysagemcombox.lanIpv6",
                        state: {
                            url: "/lanIpv6",
                            templateUrl: "views/mysagemcombox.lan-ipv6.html",
                            controller: "LanIPv6Controller"
                        }
                    }, {
                        name: "user.mysagemcombox.ecoMode",
                        state: {
                            url: "/ecoMode",
                            templateUrl: "views/mysagemcombox.eco-mode.html",
                            controller: "LEDController"
                        }
                    }, {
                        name: "user.mysagemcombox.led",
                        state: {
                            url: "/led",
                            templateUrl: "views/mysagemcombox.led.html",
                            controller: "LEDHubLightController"
                        }
                    }, {
                        name: "user.ethernet",
                        state: {
                            url: "/ethernet",
                            templateUrl: "views/ethernet.html",
                            controller: "EthernetController"
                        }
                    }, {
                        name: "user.wifi",
                        state: {
                            url: "/wifi/:radio/:mode",
                            templateUrl: "views/wifi.main.html",
                            controller: "WifiMainController"
                        }
                    }, {
                        name: "user.wifi.basic",
                        state: {
                            url: "/basic",
                            templateUrl: "views/wifi.basic.html",
                            controller: "WiFiBasicController",
                            data: {
                                module: "wifiBasic"
                            }
                        }
                    }, {
                        name: "user.wifi.advanced",
                        state: {
                            url: "/advanced",
                            templateUrl: "views/wifi.advanced.html",
                            controller: "WiFiAdvancedController",
                            data: {
                                module: "wifiAdvanced"
                            }
                        }
                    }, {
                        name: "user.wifi.wps",
                        state: {
                            url: "/wps",
                            templateUrl: "views/wifi.wps.html",
                            controller: "WiFiWPSController",
                            data: {
                                module: "wifiWPS"
                            }
                        }
                    }, {
                        name: "user.wifi.stats",
                        state: {
                            url: "/stats",
                            templateUrl: "views/wifi.stats.html",
                            controller: "WiFiStatsController",
                            data: {
                                module: "wifiStats"
                            }
                        }
                    }, {
                        name: "user.wifi.mac-filter",
                        state: {
                            url: "/mac-filter",
                            templateUrl: "views/wifi.mac-filter.html",
                            controller: "WiFiMacFilterController",
                            data: {
                                module: "wifiMacFilter"
                            }
                        }
                    }, {
                        name: "user.wifi.scheduling",
                        state: {
                            url: "/scheduling",
                            templateUrl: "views/wifi.scheduling.html",
                            controller: "WifiSchedulingController"
                        }
                    }, {
                        name: "user.wifi.environment",
                        state: {
                            url: "/environment",
                            templateUrl: "views/wifi.environment.main.html"
                        }
                    }, {
                        name: "user.wifi.environment.scan",
                        state: {
                            url: "/scan",
                            templateUrl: "views/wifi.environment.scan.html",
                            controller: "WiFiEnvironmentController"
                        }
                    }, {
                        name: "user.wifi.environment.recommended",
                        state: {
                            url: "/recommended",
                            templateUrl: "views/wifi.environment.recommended.html",
                            controller: "WiFiChannelController"
                        }
                    }, {
                        name: "user.wifi.guest",
                        state: {
                            url: "/guest",
                            templateUrl: "views/wifi.guest.html"
                        }
                    }, {
                        name: "user.wifi.wds",
                        state: {
                            url: "/wds",
                            templateUrl: "views/wifi.wds.html"
                        }
                    }, {
                        name: "user.accessControl",
                        state: {
                            url: "/access-control",
                            templateUrl: "views/access-control.main.html"
                        }
                    }, {
                        name: "user.accessControl.dmz",
                        state: {
                            url: "/dmz",
                            templateUrl: "views/access-control.dmz.html",
                            controller: "DMZController"
                        }
                    }, {
                        name: "user.accessControl.dmzIPv6",
                        state: {
                            url: "/dmzIPv6",
                            templateUrl: "views/access-control.dmz-ipv6.html",
                            controller: "DmzIPv6Controller"
                        }
                    }, {
                        name: "user.accessControl.natMapping",
                        state: {
                            url: "/nat-mapping",
                            templateUrl: "views/access-control.nat-mapping.html",
                            controller: "NatMappingController"
                        }
                    }, {
                        name: "user.accessControl.firewall",
                        state: {
                            url: "/firewall",
                            templateUrl: "views/access-control.firewall.html",
                            controller: "FirewallController",
                            data: {
                                module: "firewall"
                            }
                        }
                    }, {
                        name: "user.accessControl.remoteaccess",
                        state: {
                            url: "/remote-access",
                            templateUrl: "views/access-control.remote-access.html",
                            controller: "RemoteManagementController",
                            data: {
                                module: "remoteAccess"
                            }
                        }
                    }, {
                        name: "user.accessControl.user",
                        state: {
                            url: "/user",
                            templateUrl: "views/access-control.user.html",
                            controller: "AccessControlUserController"
                        }
                    }, {
                        name: "user.accessControl.upnp",
                        state: {
                            url: "/upnp",
                            templateUrl: "views/access-control.upnp.html",
                            controller: "UPnPController"
                        }
                    }, {
                        name: "user.accessControl.parentalControl",
                        state: {
                            url: "/parental-control",
                            templateUrl: "views/access-control.parental-control.main.html"
                        }
                    }, {
                        name: "user.accessControl.parentalControl.planning",
                        state: {
                            url: "/planning",
                            templateUrl: "views/access-control.parental-control.planning.html",
                            controller: "ParentalControllerPlanning"
                        }
                    }, {
                        name: "user.accessControl.parentalControl.filtering",
                        state: {
                            url: "/filtering",
                            templateUrl: "views/access-control.parental-control.filtering.html",
                            controller: "ParentalControllerFiltering"
                        }
                    }, {
                        name: "user.accessControl.parentalControl.control",
                        state: {
                            url: "/control",
                            templateUrl: "views/access-control.parental-control.profile.html",
                            controller: "ParentalControllerProfiles"
                        }
                    }, {
                        name: "user.accessControl.portForwarding",
                        state: {
                            url: "/port-forwarding",
                            templateUrl: "views/access-control.port-forwarding.main.html",
                            data: {
                                module: "portForwarding"
                            }
                        }
                    }, {
                        name: "user.accessControl.portForwarding.addRule",
                        state: {
                            url: "/add-rule",
                            templateUrl: "views/access-control.port-forwarding.html",
                            controller: "PortForwardingController"
                        }
                    }, {
                        name: "user.accessControl.portForwarding.gamesApp",
                        state: {
                            url: "/games-app",
                            templateUrl: "views/access-control.port-forwarding.games-app.html",
                            controller: "GamesController"
                        }
                    }, {
                        name: "user.accessControl.portTriggering",
                        state: {
                            url: "/port-triggering",
                            templateUrl: "views/access-control.port-triggering.html",
                            controller: "PortTriggeringController",
                            data: {
                                module: "portTriggering"
                            }
                        }
                    }, {
                        name: "user.accessControl.certificates",
                        state: {
                            url: "/certificates",
                            templateUrl: "views/access-control.certificates.main.html"
                        }
                    }, {
                        name: "user.accessControl.certificates.local",
                        state: {
                            url: "/local",
                            templateUrl: "views/access-control.certificates.local.html"
                        }
                    }, {
                        name: "user.accessControl.certificates.remote",
                        state: {
                            url: "/remote",
                            templateUrl: "views/access-control.certificates.remote.html"
                        }
                    }, {
                        name: "user.accessControl.vpn",
                        state: {
                            url: "/vpn",
                            templateUrl: "views/access-control.vpn.main.html"
                        }
                    }, {
                        name: "user.accessControl.vpn.lt2p",
                        state: {
                            url: "/lt2p",
                            templateUrl: "views/access-control.vpn.lt2p.html"
                        }
                    }, {
                        name: "user.accessControl.vpn.ipsec",
                        state: {
                            url: "/ipSec",
                            templateUrl: "views/access-control.vpn.ipsec.html"
                        }
                    }, {
                        name: "user.ethernetDevice",
                        state: {
                            url: "/device/:layer/:uid",
                            templateUrl: "views/ethernet-device.main.html",
                            controller: "EthernetDeviceMainController"
                        }
                    }, {
                        name: "user.ethernetDevice.deviceInfo",
                        state: {
                            url: "/device-info",
                            templateUrl: "views/ethernet-device.device-info.html",
                            controller: "EthernetDeviceController"
                        }
                    }, {
                        name: "user.ethernetDevice.dmz",
                        state: {
                            url: "/dmz",
                            templateUrl: "views/ethernet-device.dmz.html",
                            controller: "DMZController",
                            data: {
                                module: "dmz"
                            }
                        }
                    }, {
                        name: "user.ethernetDevice.portForwarding",
                        state: {
                            url: "/port-forwarding",
                            templateUrl: "views/ethernet-device.port-forwarding.main.html",
                            controller: "EthernetDevicePFMainController"
                        }
                    }, {
                        name: "user.ethernetDevice.portForwarding.addRule",
                        state: {
                            url: "/add-rule",
                            templateUrl: "views/access-control.port-forwarding.html",
                            controller: "PortForwardingController"
                        }
                    }, {
                        name: "user.ethernetDevice.portForwarding.gamesApp",
                        state: {
                            url: "/games-app",
                            templateUrl: "views/access-control.port-forwarding.games-app.html",
                            controller: "GamesController"
                        }
                    }, {
                        name: "user.ethernetDevice.firewall",
                        state: {
                            url: "/firewall",
                            templateUrl: "views/access-control.firewall.html",
                            controller: "FirewallController"
                        }
                    }, {
                        name: "user.ethernetDevice.parentalControl",
                        state: {
                            url: "/parental-control",
                            templateUrl: "views/access-control.parental-control.planning.html",
                            controller: "ParentalControllerPlanning"
                        }
                    }, {
                        name: "user.plcDevice",
                        state: {
                            url: "/plc/:uid",
                            templateUrl: "views/plc.device-info.html",
                            controller: "PlcDeviceController"
                        }
                    }, {
                        name: "user.usbDevice",
                        state: {
                            url: "/usb-devices/:uid",
                            templateUrl: "views/usb-device.main.html",
                            controller: "UsbDeviceMainController"
                        }
                    }, {
                        name: "user.usbDevice.deviceInfo",
                        state: {
                            url: "/usb-devices-info/",
                            templateUrl: "views/usb-device.device-info.html",
                            controller: "UsbDeviceController"
                        }
                    }, {
                        name: "user.usbDevice.massStorage",
                        state: {
                            url: "/mass-storage/",
                            templateUrl: "views/mysagemcombox.mass-storage.html",
                            controller: "MassStorageController"
                        }
                    }, {
                        name: "user.mysagemcombox.route",
                        state: {
                            url: "/route",
                            templateUrl: "views/mysagemcombox.route.main.html",
                            data: {
                                module: "route"
                            }
                        }
                    }, {
                        name: "user.mysagemcombox.route.static",
                        state: {
                            url: "/static",
                            templateUrl: "views/mysagemcombox.route.static.html",
                            controller: "RouteStaticController"
                        }
                    }, {
                        name: "user.mysagemcombox.mymedia",
                        state: {
                            url: "/myMedia",
                            templateUrl: "views/my.media.html",
                            controller: "MyMediaController"
                        }
                    }, {
                        name: "user.mycloud",
                        state: {
                            url: "/mycloud",
                            templateUrl: "views/mycloud.main.html"
                        }
                    }, {
                        name: "user.mycloud.login",
                        state: {
                            url: "/login",
                            templateUrl: "views/mycloud.login.html",
                            controller: "MyCloudController"
                        }
                    }, {
                        name: "user.mycloud.dropbox",
                        state: {
                            url: "/dropbox",
                            templateUrl: "views/mycloud.dropbox.html",
                            controller: "MyCloudController"
                        }
                    }, {
                        name: "user.phonebook",
                        state: {
                            url: "/phonebook",
                            templateUrl: "views/phonebook.main.html"
                        }
                    }, {
                        name: "user.phonebook.contacts",
                        state: {
                            url: "/contacts",
                            templateUrl: "views/phonebook.contacts.html",
                            controller: "PhonebookContactsController"
                        }
                    }, {
                        name: "user.phonebook.callLog",
                        state: {
                            url: "/callLog",
                            templateUrl: "views/phonebook.call-log.html",
                            controller: "VoiceDeviceController"
                        }
                    }, {
                        name: "user.answeringMachine",
                        state: {
                            url: "/answering-machine",
                            templateUrl: "views/answering-machine.main.html"
                        }
                    }, {
                        name: "user.answeringMachine.messages",
                        state: {
                            url: "/messages",
                            templateUrl: "views/answering-machine.messages.html",
                            controller: "AnsweringMachineMessagesController"
                        }
                    }, {
                        name: "user.answeringMachine.settings",
                        state: {
                            url: "/settings/:uid",
                            templateUrl: "views/answering-machine.settings.html",
                            controller: "AnsweringMachineSettingsController"
                        }
                    }, {
                        name: "user.answeringMachine.mail-server",
                        state: {
                            url: "/mail-server",
                            templateUrl: "views/answering-machine.mail-server.html",
                            controller: "AnsweringMachineMailserverController",
                            data: {
                                module: "mailServerSettings"
                            }
                        }
                    }, {
                        name: "user.voiceDevice",
                        state: {
                            url: "/voice-device-info/:uid",
                            templateUrl: "views/voice.device-info.html",
                            controller: "VoiceDeviceController"
                        }
                    }, {
                        name: "user.internetConnectivity",
                        state: {
                            url: "/internetConnectivity",
                            templateUrl: "views/internet-connectivity.main.html"
                        }
                    }, {
                        name: "user.internetConnectivity.ppp",
                        state: {
                            url: "/ppp",
                            templateUrl: "views/internet-connectivity.ppp.html",
                            controller: "PPPController"
                        }
                    }, {
                        name: "user.internetConnectivity.wan",
                        state: {
                            url: "/wan",
                            templateUrl: "views/internet-connectivity.wan.html",
                            controller: "WANController",
                            data: {
                                module: "internetConnectivityWanAdvanced"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.trafficSpeed",
                        state: {
                            url: "/trafficSpeed",
                            templateUrl: "views/internet-connectivity.traffic-speed.html",
                            controller: "TrafficSpeedController"
                        }
                    }, {
                        name: "user.internetConnectivity.3g",
                        state: {
                            url: "/3g",
                            templateUrl: "views/internet-connectivity.3g.html",
                            controller: "Backup3gController"
                        }
                    }, {
                        name: "user.internetConnectivity.qos",
                        state: {
                            url: "/qos",
                            templateUrl: "views/internet-connectivity.qos.main.html",
                            data: {
                                module: "qos"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.qos.configuration",
                        state: {
                            url: "/configuration",
                            templateUrl: "views/internet-connectivity.qos.configuration.html",
                            controller: "QoSConfigurationController",
                            data: {
                                module: "qos"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.qos.queueConfiguration",
                        state: {
                            url: "/queueConfiguration",
                            templateUrl: "views/internet-connectivity.qos.queue-configuration.html",
                            controller: "QoSQueueController",
                            data: {
                                module: "qos"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.qos.classification",
                        state: {
                            url: "/classification",
                            templateUrl: "views/internet-connectivity.qos.classification.html",
                            controller: "QoSClassificationController",
                            data: {
                                module: "qos"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.qos.policer",
                        state: {
                            url: "/policer",
                            templateUrl: "views/internet-connectivity.qos.policer.html",
                            controller: "QoSPolicerController",
                            data: {
                                module: "qos"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.basic",
                        state: {
                            url: "/basic",
                            templateUrl: "views/internet-connectivity.basic.html",
                            data: {
                                module: "internetConnectivityWanBasic"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.basic.ipv4",
                        state: {
                            url: "/ipv4",
                            templateUrl: "views/internet-connectivity.ipv4.html",
                            controller: "SimpleController",
                            data: {
                                module: "internetConnectivityWanBasic"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.ipv6",
                        state: {
                            url: "/ipv6",
                            templateUrl: "views/internet-connectivity.ipv6.html"
                        }
                    }, {
                        name: "user.internetConnectivity.basic.simpleIpv6",
                        state: {
                            url: "/simpleIpv6",
                            templateUrl: "views/internet-connectivity.ipv6Simple.html",
                            controller: "SimpleIPv6Controller",
                            data: {
                                module: "simpleIpv6"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.simpleIpv6",
                        state: {
                            url: "/simpleIPv6",
                            templateUrl: "views/internet-connectivity.ipv6Simple.html",
                            controller: "SimpleIPv6Controller",
                            data: {
                                module: "simpleIPv6Main"
                            }
                        }
                    }, {
                        name: "user.internetConnectivity.gpon",
                        state: {
                            url: "/gpon",
                            templateUrl: "views/internet-connectivity.gpon.html",
                            controller: "GponController"
                        }
                    }, {
                        name: "user.internetConnectivity.bridgemodeInternetPage",
                        state: {
                            url: "/bridgemode",
                            templateUrl: "views/mysagemcombox.bridge-mode.html",
                            controller: "BridgeModeController",
                            data: {
                                module: "bridgemodeInternetPage"
                            }
                        }
                    }, {
                        name: "user.sip",
                        state: {
                            url: "/sip-settings",
                            templateUrl: "views/sip-settings.main.html",
                            data: {
                                module: "sip"
                            }
                        }
                    }, {
                        name: "user.sip.telephones",
                        state: {
                            url: "/telephones-matrix",
                            templateUrl: "views/sip-telephones.matrix.html",
                            controller: "TelephonesMatrixController"
                        }
                    }, {
                        name: "user.sip.callsettings",
                        state: {
                            url: "/call-settings",
                            templateUrl: "views/sip-settings.call-settings.html",
                            controller: "CallBlockingController"
                        }
                    }, {
                        name: "user.sip.settings",
                        state: {
                            url: "/settings",
                            templateUrl: "views/sip-settings.settings.html",
                            controller: "SipSettingsController"
                        }
                    }, {
                        name: "user.inTwo",
                        state: {
                            url: "/inTwo",
                            templateUrl: "views/intwo-main.html"
                        }
                    }, {
                        name: "user.webradio",
                        state: {
                            url: "/web-radio",
                            templateUrl: "views/webradio.html"
                        }
                    }, {
                        name: "user.inTwo.device",
                        state: {
                            url: "/device",
                            templateUrl: "views/intwo-device.html"
                        }
                    }, {
                        name: "user.inTwo.settings",
                        state: {
                            url: "/settings",
                            templateUrl: "views/intwo-settings.html"
                        }
                    }, {
                        name: "user.dect",
                        state: {
                            url: "/dect",
                            templateUrl: "views/dect.main.html"
                        }
                    }, {
                        name: "user.dect.basic",
                        state: {
                            url: "/basic",
                            templateUrl: "views/dect.basic.html",
                            controller: "DectBasicController"
                        }
                    }, {
                        name: "user.dect.advanced",
                        state: {
                            url: "/advanced",
                            templateUrl: "views/dect.advanced.html",
                            controller: "DectAdvancedController",
                            data: {
                                module: "dectAdvanced"
                            }
                        }
                    }, {
                        name: "user.dectHandset",
                        state: {
                            url: "/dectHandset/:uid",
                            templateUrl: "views/dect.handset.main.html",
                            controller: "DectHandsetMainController"
                        }
                    }, {
                        name: "user.dectHandset.handset",
                        state: {
                            url: "/handset",
                            templateUrl: "views/dect.handset.handset.html",
                            controller: "DectHandsetController"
                        }
                    }, {
                        name: "user.dectHandset.advanced",
                        state: {
                            url: "/advanced",
                            templateUrl: "views/dect.handset.advanced.html",
                            controller: "DectHandsetController"
                        }
                    }],
                    admin: [{
                        name: "admin",
                        state: {
                            "abstract": !0,
                            templateUrl: "views/base.html",
                            data: {
                                access: a.admin
                            }
                        }
                    }],
                    onu: [{
                        name: "onu",
                        state: {
                            "abstract": !0,
                            templateUrl: "views/base.html",
                            data: {
                                access: a.admin
                            }
                        }
                    }],
                    internal: [{
                        name: "internal",
                        state: {
                            "abstract": !0,
                            templateUrl: "views/base.html",
                            data: {
                                access: a.internal
                            }
                        }
                    }],
                    poweruser: [{
                        name: "poweruser",
                        state: {
                            "abstract": !0,
                            templateUrl: "views/base.html",
                            data: {
                                access: a.internal
                            }
                        }
                    }],
                    mso: [{
                        name: "mso",
                        state: {
                            "abstract": !0,
                            templateUrl: "views/base.html",
                            data: {
                                access: a.mso
                            }
                        }
                    }]
                }
            }
        },
        replaceXpaths: {
            adminAdvanced: {
                dns1Static: "Device/Managers/UserInterface/Dns/StaticNames/StaticName[@uid='1']/StaticNameServer",
                dns2Static: "Device/Managers/UserInterface/Dns/StaticNames/StaticName[@uid='2']/StaticNameServer"
            },
            mySagemcomBox: {
                deviceInfo: {
                    upTime: 'Device/IP/Interfaces/Interface[Alias="IP_DATA"]/LastChange',
                    wan: {
                        connectionUpTime: 'Device/IP/Interfaces/Interface[Alias="IP_DATA"]/LastChange'
                    }
                }
            },
            forbiddenIps: {
                ips: {
                    upnpHost: "",
                    dataModels: ""
                }
            }
        }
    }
};
"undefined" != typeof module && module.exports ? exports.profile = profile : $.configs = $.extend($.configs, profile);
var currentVersion = "3.7.8";
if ("undefined" != typeof module && module.exports)
    exports.allProfiles = ["myrepublic", "optus", "dtag_gpon", "dtag_gfast", "dtag_xdsl", "bell", "bthome", "sunrise", "telstra", "maelstrom", "tim", "demo", "charter", "charter_5280", "windstream", "sonne", "oneboxpt", "telus", "teo", "talktalk", "myrepublic_australia", "siminn", "comhem", "maelstrom_cable", "bouygues_extender", "tlc", "get", "ssc", "proximus_f5380", "tim_v2", "demo_gpon", "telia_eth", "telia_eth_debug", "tim_f5360", "oi_f5655", "eole", "telia_air", "verizon", "orange_f5688t", "masmovil_gpon", "totalplay", "clarop"],
    exports.availableProfiles = ["talktalk"],
    exports.currentVersion = currentVersion;
else {
    var selectedProfile = "talktalk";
    $.config = $.configs[selectedProfile];
    var subProfile = null;
    if ($.config.subProfiles && $.config.subProfiles.length > 0 && $.each($.config.subProfiles, function(a, b) {
        return $.configs[b.name] && $.isFunction(b.condition) && b.condition() ? (subProfile = $.configs[b.name],
        selectedProfile = b.name,
        !1) : void 0
    }),
    subProfile ? ($.config = subProfile,
    $.config.isSubProfile = !0) : delete $.config.subProfile,
    $.config.countries = $.configs.countries,
    delete $.configs,
    delete $.xmo.getModel,
    !$.isEmptyObject($.config.globals))
        for (var x in $.config.globals)
            $.globals[x] = $.config.globals[x];
    $.isEmptyObject($.config.replaceXpaths) || $.util._replaceXpathRecursive($.config.replaceXpaths, $.xpaths),
    $.config.title && (document.title = $.config.title),
    $.util.hasFeature("dtagXdsl") && (document.title = "F@st5352 VRX517 B" === document.title ? "Speedport Plus Bonding" : "Speedport Plus")
}
