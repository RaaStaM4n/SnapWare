$.xmo.StringTree,
$.xmo.StringOrTree,
$.xmo.NStringTree,
$.xmo.NStringOrTree,
$.xmo.StringSet,
$.xmo.Value,
$.xmo.NValueTree,
$.xmo.NValueOrTree,
$.xmo.sessionTimeOut = 0,
$.xmo.sessionStartDate = 0,
$.xmo.XmoError = function(a) {
    a && (this.message = a)
}
,
$.xmo.XmoError.prototype = new Error("XMO error"),
$.xmo.NotLoggedInError = function(a) {
    a && (this.message = a)
}
,
$.xmo.NotLoggedInError.prototype = new $.xmo.XmoError("Not logged in error"),
$.xmo.RequestError = function(a) {
    a && (this.message = a)
}
,
$.xmo.RequestError.prototype = new $.xmo.XmoError("Request error"),
$.xmo.SetValueError = function(a) {
    a && (this.message = a)
}
,
$.xmo.SetValueError.prototype = new $.xmo.XmoError("Set value error"),
$.xmo.err = {
    XMO_REQUEST_NO_ERR: 16777216,
    XMO_REQUEST_ID_ERR: 16777233,
    XMO_NO_ERR: 16777238,
    XMO_INVALID_SESSION_ERR: 16777219,
    XMO_REQUEST_ACTION_ERR: 16777236,
    XMO_ACTION_CALLBACK_ERR: 16777248,
    XMO_INVALIDE_HOST_SESSION_ERR: 16777228
},
$.xmo.init = function() {
    $.gui.init("en", "gtw")
}
,
$.xmo.logger = console,
$.xmo.genericCallback = function(a, b) {
    var c, d = [], e = function() {
        if (!c)
            throw $.xmo.logger.error("XMO communication failed"),
            $.xmo.logout(),
            new $.xmo.NotLoggedInError;
        if (c.code === $.xmo.err.XMO_INVALID_SESSION_ERR)
            throw $.xmo.logger.error('Not logged in: "' + c.description + '" (' + c.code + ")"),
            $.xmo.logout(),
            new $.xmo.NotLoggedInError("setValuesFlat error: XMO_INVALID_SESSION_ERR");
        if (c.code !== $.xmo.err.XMO_REQUEST_NO_ERR && $.xmo.logger.error('XMO setValue request error: "' + c.description + '" (' + c.code + ")"),
        d.length > 0) {
            var a = 0;
            for (var b in map) {
                if (d[a].error.code !== $.xmo.err.XMO_NO_ERR)
                    throw $.xmo.logger.error('XMO setValue action error: "' + d[a].error.description + '" (' + d[a].error.code + ') (xpath: "' + b + '", value: "' + map[b] + '")'),
                    new $.xmo.SetValueError('XMO setValue action error: "' + d[a].error.description + '" (' + d[a].error.code + ') (xpath: "' + b + '", value: "' + map[b] + '")');
                ++a
            }
        }
    };
    if (arguments.length > 1 && (a = arguments[1]),
    c = a.error,
    a.actions)
        for (var f = 0; f < a.actions.length; ++f) {
            var g = a.actions[f]
              , h = g.error
              , i = {
                error: h
            };
            d.push(i)
        }
    e(),
    b()
}
,
$.xmo.login = function(a, b) {
    if ($.gui.api.Client.defaults.requestErrorFunc = function(a, b) {
        var c = $.gui;
        if (a.code === c.XMO_INVALID_SESSION_ERR || a.code === c.XMO_SESSION_LOGOUT_ERR || a.code === c.XMO_SESSION_TIMEOUT_ERR)
            this.client.isConnected() && (this.client._clean(),
            c.openLoginForm(a));
        else {
            if (a.code === c.XMO_REQUEST_ACTION_ERR)
                return !0;
            a.code === c.XMO_REQUEST_ID_ERR,
            this.client._clean(),
            c.refreshPage()
        }
        return !1
    }
    ,
    $.xmo.client = new $.gui.api.Client,
    $.xmo.client.openSession(a, b, function() {
        $.xmo.logger.log("Logging success!"),
        $.xmo.login.lastError_ = null
    }, function(a, b) {
        $.xmo.logger.error('Logging error: "' + a.description + '" (' + a.code + ")"),
        $.xmo.client = null,
        $.xmo.login.lastError_ = a
    }, {
        sessionTimeout: $.gui.opt.XMO_SESSION_TIMEOUT_OPT
    }),
    $.xmo.login.lastError_)
        throw new $.xmo.NotLoggedInError({
            errCode: $.xmo.login.lastError_.code,
            message: 'Logging error: "' + $.xmo.login.lastError_.description + '" (' + $.xmo.login.lastError_.code + ")"
        })
}
,
$.xmo.restoreFromCookie = function() {
    return $.gui.api.Client.defaults.requestErrorFunc = function(a, b) {
        var c = $.gui;
        if (a.code === c.XMO_INVALID_SESSION_ERR || a.code === c.XMO_SESSION_LOGOUT_ERR || a.code === c.XMO_SESSION_TIMEOUT_ERR)
            this.client.isConnected() && (this.client._clean(),
            c.openLoginForm(a));
        else {
            if (a.code === c.XMO_REQUEST_ACTION_ERR)
                return !0;
            a.code === c.XMO_REQUEST_ID_ERR,
            this.client._clean(),
            c.refreshPage()
        }
        return !1
    }
    ,
    $.xmo.client = new $.gui.api.Client,
    $.xmo.client.restoreFromCookie(),
    $.xmo.loggedin()
}
,
$.xmo.logout = function(a) {
    $.xmo.loggedin() ? $.xmo.client.closeSession(function() {
        $.xmo.logger.log("Logout success")
    }, function(a, b) {
        $.xmo.logger.log('Logout error: "' + a.description + '" (' + a.code + ")")
    }) : $.xmo.logger.log("Not logged in."),
    $.cookie("session", null, {
        path: "/"
    }),
    $.xmo.client = null,
    "undefined" != typeof a && a || ($(location).attr("hash").search("mobile") > -1 ? window.location.hash = "/#/mobile/" : window.location.hash = "",
    location.reload())
}
,
$.xmo.loggedin = function() {
    return $.xmo.sessionStartDate = (new Date).getTime(),
    !(!$.xmo.client || !$.xmo.client.isConnected())
}
,
$.xmo.reboot = function() {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("reboot error: Not logged in");
    var a = $.xmo.client.newRequest();
    a.remoteCall($.xpaths.trafficStats.rpc, "reboot", {
        source: "GUI"
    }),
    a.send()
}
,
$.xmo.saveConfiguration = function() {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("saveConfiguration error: Not logged in");
    var a = $.xmo.client.newRequest();
    $.config.modules.backupConfigurationAllBackup === !0 ? a.downloadSpecificFile($.xpaths.mySagemcomBox.maintenance.saveRestore.save, "device.cfg", 1, function() {}, function(a) {}) : a.downloadFile($.xpaths.mySagemcomBox.maintenance.saveRestore.save, function() {}, function(a) {}),
    a.send()
}
;
var validRestoreFile = !0;
$.xmo.restoreConfiguration = function(a) {
    if (validRestoreFile = !0,
    $("#errorRestoreFile").hide(),
    !$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("restoreConfiguration error: Not logged in");
    var b = $.xmo.client.newRequest();
    return $.config.modules.restoreConfigurationAllBackup === !0 ? b.uploadSpecificFile($.xpaths.mySagemcomBox.maintenance.saveRestore.restore, $(a), 1, !0, function(a) {}, function(a) {}) : b.uploadFile($.xpaths.mySagemcomBox.maintenance.saveRestore.restore, $(a), function(a) {}, function(a) {
        validRestoreFile = !1
    }),
    b.send(),
    validRestoreFile
}
,
$.xmo.firmwareUpgrade = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("firmwareUpgrade error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.firmwareUpgrade($.xpaths.trafficStats.rpc, $(a), function() {}, function() {
        throw new Error("An error has occurred")
    }, {
        fileType: b
    }),
    c.send()
}
,
$.xmo.reinitialize = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("reinitialize error: Not logged in");
    var d = $.xmo.client.newRequest();
    a ? d.remoteCall($.xpaths.trafficStats.rpc, "reinitialize", {
        RestoreMode: a
    }) : d.remoteCall($.xpaths.trafficStats.rpc, "reinitialize"),
    d.send(b, c)
}
,
$.xmo.generatePin = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("generatePin error: Not logged in");
    var c = $.xmo.client.newRequest();
    b = "5GHz" === b ? "VID1" : "PRIV0",
    c.remoteCall($.xpaths.rpc.accessPoint.replace("#", b), "generatePinCode", {}, void 0, function(b) {
        a(b)
    }, function() {
        a({
            PinCode: "An error has ocurred"
        })
    }),
    c.send()
}
,
$.xmo.startWPS = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("startWPS error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.remoteCall(a, "startWPS", {}),
    c.send(b.success, b.error)
}
,
$.xmo.startDualWPS = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("startWPS error: Not logged in");
    var c = $.xmo.client.newRequest()
      , d = $.xmo.client.newRequest();
    c.remoteCall(a[0], "startWPS", {}),
    d.remoteCall(a[1], "startWPS", {});
    var e = 0
      , f = function() {
        e++,
        e > 1 && b.success()
    };
    c.send(f, b.error),
    d.send(f, b.error)
}
,
$.xmo.startPhysicalWPS = function(a) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("startPhysicalWPS error: Not logged in");
    var b = $.xmo.client.newRequest();
    b.remoteCall(a, "startPhysicalWPS", {}),
    b.send()
}
,
$.xmo.getInterfaceXPathByWanProvisioningMode = function(a, b, c) {
    var d = "dslite"
      , e = "" !== a && a.toLowerCase() === d && "" !== b && "ipv4" === b.toLowerCase() ? "DSLITE_ENTRY" : "IP_DATA";
    return "DSLITE_ENTRY" === e ? e = b && "ipv4" === b.toLowerCase() ? "DSLITE_ENTRY" : "IP_DATA" : "IP_BR_LAN" === c && (e = c),
    $.xmo.getPingInterfaceXpath(e)
}
,
$.xmo.getPingInterfaceXpath = function(a) {
    var b = 'Device/IP/Interfaces/Interface[Alias="#"]/@uid'.replace("#", a)
      , c = $.xmo.getValuesTree(b);
    return c ? "Device.IP.Interface." + c : ""
}
,
$.xmo.ping = function(a, b, c, d, e, f, g) {
    var h = "";
    if (h = $.util.hasFeature("pingInterface") ? $.xmo.getPingInterfaceXpath(g) : $.xmo.getInterfaceXPathByWanProvisioningMode(e, f, g),
    c || "" !== c || (c = "AUTO"),
    !$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("ping error: Not logged in");
    var i = null
      , j = null;
    if (!h)
        return i = {
            Status: "Inactive",
            PacketsTransmitted: 0,
            PacketsReceived: 0,
            PerCentLoss: 100
        },
        d(i),
        i;
    var k = $.xmo.client.newRequest();
    k.remoteCall($.xpaths.trafficStats.rpc, "ping", {
        Host: a,
        Count: b,
        Protocol: c,
        Interface: h
    });
    var l = function(a) {
        arguments.length > 1 && (a = arguments[1]),
        j = a.error,
        i = a.actions[0].callbacks[0].parameters,
        j.code !== $.xmo.err.XMO_REQUEST_NO_ERR ? i.Status = "Inactive" : i.Status = "Active",
        d(i)
    };
    return k.send(l, l, {
        synchronous: !1
    }),
    i
}
,
$.xmo.eject = function(a, b, c, d) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("eject error: Not logged in");
    var e = $.xmo.client.newRequest();
    e.remoteCall($.xpaths.rpc.usbPort.replace("#", a), "eject", {
        force: b
    }, void 0),
    e.send(c, d)
}
,
$.xmo.traceroute = function(a, b, c, d, e) {
    var f = $.xmo.getInterfaceXPathByWanProvisioningMode(d, e);
    if (e || (e = "AUTO"),
    !$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("traceroute error: Not logged in");
    var g = $.xmo.client.newRequest();
    g.remoteCall($.xpaths.trafficStats.rpc, "traceRoute", {
        Host: a,
        Protocol: e,
        Count: b,
        Interface: f
    }, c),
    g.send(c, c)
}
,
$.xmo.testPhones = function(a) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("traceroute error: Not logged in");
    var b = $.xmo.client.newRequest();
    b.remoteCall($.xpaths.rpc.voiceService, "testPhones", null, a),
    b.send(a, a)
}
,
$.xmo.nslookup = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("reboot error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.remoteCall($.xpaths.trafficStats.rpc, "nslookup", {
        Host: a
    });
    var d = null
      , e = null
      , f = function(a) {
        if (arguments.length > 1 && (a = arguments[1]),
        e = a.error,
        d = a.actions[0].callbacks[0].parameters,
        e.code === $.xmo.err.XMO_REQUEST_ACTION_ERR && b(d),
        e.code !== $.xmo.err.XMO_REQUEST_NO_ERR)
            throw new $.xmo.NotLoggedInError("Error in nslookup request: " + e.code);
        b(d)
    };
    return c.send(f, f, {
        synchronous: !1
    }),
    d
}
,
$.xmo.changePassword = function(a, b, c, d, e, f) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("changePassword error: Not logged in");
    $.xmo.changePasswordRPC(a, b, c, e, f)
}
,
$.xmo.changePasswordRPC = function(a, b, c, d, e) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("changePasswordRPC error: Not logged in");
    try {
        var f = $.xmo.client.newRequest();
        f.remoteCall($.xpaths.rpc.user.replace("#", a), "changeClearPassword", {
            OldPassword: b,
            NewPassword: c
        }),
        f.send(d, e)
    } catch (g) {
        throw new Error("Fatal error!")
    }
}
,
$.xmo.addChildrenMultiple = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("addChild error: Not logged in");
    var d;
    d = c ? c : $.xmo.client.newRequest();
    for (var e = 0; e < a.values.length; e++)
        for (var f = 0; f < a.values[e].length; f++)
            d.addChild(a.aparent[e], a.values[e][f]);
    if (c)
        return d;
    var g = !0
      , h = function() {}
      , i = function() {};
    b && (g = !!b.sync,
    h = b.success,
    i = b.err),
    d.send(h, i, {
        synchronous: g
    })
}
,
$.xmo.addOrUpdate = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("addOrUpdate error: Not logged in");
    var d = $.xmo.client.newRequest();
    if (a.toAdd && a.toAdd.values && a.toAdd.values.length)
        for (var e = 0; e < a.toAdd.values.length; e++)
            for (var f = 0; f < a.toAdd.values[e].length; f++)
                d.addChild(a.toAdd.parent[e], a.toAdd.values[e][f]);
    if (a.toUpdate)
        for (var g in a.toUpdate)
            d.setValue(g, a.toUpdate[g]);
    var h = !0
      , i = function() {}
      , j = function() {};
    b && (h = !!b.sync,
    i = b.success,
    j = b.err),
    d.send(i, j, {
        synchronous: h
    })
}
,
$.xmo.addChildren = function(a, b, c, d) {
    $.xmo.addChildrenMultiple({
        aparent: [a],
        values: [b]
    }, c, d)
}
,
$.xmo.addChild = function(a, b, c) {
    $.xmo.addChildren(a, [b], c)
}
,
$.xmo.delChildren = function(a, b) {
    var c = b || {};
    if (void 0 === c.sync && (c.sync = !0),
    !$.xmo.loggedin())
        throw $.xmo.showLoginPopup(),
        new $.xmo.NotLoggedInError("delChildren error: Not logged in");
    for (var d = $.xmo.client.newRequest(), e = 0; e < a.length; ++e)
        d.deleteElement(a[e]);
    d.send(c.success, c.error, {
        synchronous: c.sync
    })
}
,
$.xmo.delChild = function(a, b, c) {
    $.xmo.delChildren([a], b, c)
}
,
$.xmo.cnvStringTreeToFlatSet = function(a, b) {
    if ("string" == typeof a)
        b[a] = null;
    else if (a instanceof Object)
        for (var c in a)
            $.xmo.cnvStringTreeToFlatSet(a[c], b);
    else if (null !== a)
        throw new TypeError("Unknown type in tree: " + typeof a + " value: " + String(a))
}
,
$.xmo.fillTree = function(a, b) {
    for (var c in a)
        if ("string" == typeof a[c])
            a[c] = b[a[c]];
        else {
            if (!(a[c]instanceof Object))
                throw new TypeError("Unknown type in tree: " + typeof a[c] + " value: " + String(a[c]));
            $.xmo.fillTree(a[c], b)
        }
}
,
$.xmo.getValuesFlatSplit = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("getValuesFlat error: Not logged in");
    var d, e = 1, f = Object.keys(a).length, g = f, h = 0;
    f > $.constants.guiCoreRequestLimit && (e = Math.ceil(f / 90),
    g = 90);
    for (var i = {}, j = Object.keys(a); f >= g; ) {
        for (i = {},
        d = h; g > d; d++)
            i[j[d]] = a[j[d]];
        $.xmo.getValuesFlat(i, b, c),
        a = $.extend(a, i),
        g >= f ? f = 0 : (h = g,
        f % 90 === 0 ? g += 90 : f - g >= 90 ? g = f - (f - 90 * x) : g += f - g)
    }
    return a
}
,
$.xmo.getValuesFlat = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("getValuesFlat error: Not logged in");
    var d = $.xmo.client.newRequest();
    for (var e in a)
        e && d.getValue(e, {
            sessionOptions: {
                "capability-flags": {
                    "interface": !0
                }
            }
        });
    var f = []
      , g = null
      , h = function(b) {
        if (arguments.length > 1 && (b = arguments[1]),
        g = b.error,
        b.actions)
            for (var d = 0; d < b.actions.length; ++d) {
                var e = b.actions[d]
                  , h = e.error
                  , i = h.code === $.xmo.err.XMO_NO_ERR
                  , j = {
                    error: h,
                    value: null
                };
                if (i)
                    if (1 === e.callbacks.length)
                        j.value = e.callbacks[0].parameters[c];
                    else if (e.callbacks.length > 1) {
                        j.value = [];
                        for (var k = 0; k < e.callbacks.length; ++k) {
                            var l = e.callbacks[k];
                            j.value.push(l.parameters[c])
                        }
                    }
                f.push(j)
            }
        if (g) {
            if (g.code === $.xmo.err.XMO_INVALID_SESSION_ERR || g.code === $.xmo.err.XMO_INVALIDE_HOST_SESSION_ERR)
                throw $.xmo.logger.error('Invalid XMO session: "' + g.description + '" (' + g.code + ")"),
                $.xmo.logout(),
                new $.xmo.NotLoggedInError("getValuesFlat error: XMO_INVALID_SESSION_ERR");
            if (g.code === $.xmo.err.XMO_REQUEST_ID_ERR)
                throw $.xmo.logger.error('XMO request ID error: "' + g.description + '" (' + g.code + ")"),
                $.xmo.logout(),
                new $.xmo.NotLoggedInError("XMO request ID error");
            g.code === $.xmo.err.XMO_REQUEST_ACTION_ERR ? $.xmo.logger.warn('XMO getValue request action error: "' + g.description + '" (' + g.code + ")") : g.code !== $.xmo.err.XMO_REQUEST_NO_ERR && $.xmo.logger.error('XMO getValue request error: "' + g.description + '" (' + g.code + ")")
        } else {
            var m = $.xmo.client.newRequest();
            if (m.client.isConnected())
                throw $.xmo.logger.error("XMO communication failed"),
                $.xmo.logout(),
                new $.xmo.NotLoggedInError
        }
        if (f.length > 0) {
            var d = 0;
            for (var n in a)
                "" !== n && void 0 !== f[d] && null !== f[d] ? (a[n] = f[d].value,
                f[d].error.code !== $.xmo.err.XMO_NO_ERR && $.xmo.logger.warn('XMO getValue action error: "' + f[d].error.description + '" (' + f[d].error.code + ') (xpath: "' + n + '")'),
                ++d) : a[n] = null
        }
        return a
    }
      , i = !0
      , j = h
      , g = h;
    b && !!b.sync == !1 && (i = !!b.sync,
    j = function(a) {
        b.success(h(a))
    }
    ,
    g = function(a) {
        b.error()
    }
    ),
    d.send(j, g, {
        synchronous: i
    })
}
,
$.xmo.getCapability = function(a) {
    return $.xmo.getValuesTree(a, void 0, "capability")
}
,
$.xmo.getValuesTree = function(a, b, c) {
    c = c || "value";
    var d = {};
    $.xmo.cnvStringTreeToFlatSet(a, d);
    var e = function(a, b) {
        if ("string" == typeof b)
            return a[b];
        var c = $.extend(!0, {}, b);
        return $.xmo.fillTree(c, a),
        c
    }
      , f = !0
      , g = e
      , h = e;
    b && !!b.sync == !1 && (f = !!b.sync,
    g = function(a, c) {
        b.success(e(a, c))
    }
    ,
    h = function() {
        b.error(e(d, a))
    }
    );
    var i = {
        sync: f,
        success: function(b) {
            g(b, a)
        },
        error: function(b) {
            h(b, a)
        }
    };
    return Object.keys(d) && Object.keys(d).length > $.constants.guiCoreRequestLimit ? $.xmo.getValuesFlatSplit(d, i, c) : $.xmo.getValuesFlat(d, i, c),
    f ? e(d, a) : !0
}
,
$.xmo.setValuesFlat = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("setValuesFlat error: Not logged in");
    var c = !1
      , d = $.xmo.client.newRequest();
    for (var e in a)
        c = c || !!e,
        d.setValue(e, a[e]);
    var f = []
      , g = null
      , h = function() {
        if (!g)
            throw $.xmo.logger.error("XMO communication failed"),
            $.xmo.logout(),
            new $.xmo.NotLoggedInError;
        if (g.code === $.xmo.err.XMO_INVALID_SESSION_ERR)
            throw $.xmo.logger.error('Not logged in: "' + g.description + '" (' + g.code + ")"),
            $.xmo.logout(),
            new $.xmo.NotLoggedInError("setValuesFlat error: XMO_INVALID_SESSION_ERR");
        if (g.code !== $.xmo.err.XMO_REQUEST_NO_ERR && $.xmo.logger.error('XMO setValue request error: "' + g.description + '" (' + g.code + ")"),
        f.length > 0) {
            var b = 0;
            for (var c in a) {
                if (f[b].error.code !== $.xmo.err.XMO_NO_ERR)
                    throw $.xmo.logger.error('XMO setValue action error: "' + f[b].error.description + '" (' + f[b].error.code + ') (xpath: "' + c + '", value: "' + a[c] + '")'),
                    new $.xmo.SetValueError('XMO setValue action error: "' + f[b].error.description + '" (' + f[b].error.code + ') (xpath: "' + c + '", value: "' + a[c] + '")');
                ++b
            }
        }
    }
      , i = !0
      , j = function() {}
      , k = function(a) {
        arguments.length > 1 && (a = arguments[1]),
        g = a.error,
        h()
    };
    if (b && (i = !!b.sync,
    j = b.success,
    k = b.error),
    !c)
        return void j();
    var l = function(a) {
        arguments.length > 1 && (a = arguments[1]),
        g = a.error;
        for (var b = 0; b < a.actions.length; ++b) {
            var c = a.actions[b]
              , d = c.error
              , e = {
                error: d
            };
            f.push(e)
        }
        h(),
        j()
    };
    d.send(l, k, {
        synchronous: i
    })
}
,
$.xmo.setValuesTree = function(a, b, c) {
    var d = function(a, b, c) {
        if (null !== a)
            if (a instanceof Object)
                for (var e in a)
                    d(a[e], b[e], c);
            else
                c[b] = a
    }
      , e = {};
    d(a, b, e),
    $.xmo.setValuesFlat(e, c)
}
,
$.xmo.onPeriodicValue = function(a, b, c, d) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("onPeriodicValue error: Not logged in");
    var e = !1
      , f = 0;
    void 0 !== d && (void 0 !== d.autoSubscribe && d.autoSubscribe && (e = !0),
    void 0 !== d.notifTimer && d.notifTimer > 0 && (f = d.notifTimer));
    var g = $.xmo.client.newRequest()
      , h = [];
    if ($.xmo.client.getNotificationEvents(c),
    0 === f)
        h = g.onValueChange(a, b, b, c);
    else {
        var i = [];
        "string" == typeof a ? i.push(a) : i = a;
        for (var j in i) {
            var k = g.onPeriodicValue(i[j], b, b, c, {
                refreshTimer: f,
                notifyCurrentValue: e
            });
            h.push(k)
        }
    }
    return g.send(void 0, void 0, {
        synchronous: !0
    }),
    $.xmo.idNotif || ($.xmo.idNotif = []),
    $.isArray(h) ? ($.xmo.idNotif = $.xmo.idNotif.concat(h),
    h[0]) : ($.xmo.idNotif.push(h),
    h)
}
,
$.xmo.deleteAllNotifications = function() {
    if ($.xmo.idNotif && 0 !== $.xmo.idNotif.length)
        try {
            var a = $.xmo.client.newRequest();
            for (var b in $.xmo.idNotif)
                a.deleteNotification($.xmo.idNotif[b]);
            a.send(void 0, void 0, {
                synchronous: !1
            })
        } catch (c) {}
    $.xmo.idNotif = []
}
,
$.xmo.cancelNotification = function(a) {
    if (console.log("$.xmo.cancelNotification", a),
    a && $.xmo.idNotif && 0 !== $.xmo.idNotif.length) {
        try {
            var b = $.xmo.client.newRequest();
            b.deleteNotification(a),
            b.send(void 0, void 0, {
                synchronous: !1
            }),
            console.log("$.xmo.cancelNotification -> notification canceled", a)
        } catch (c) {
            console.log("$.xmo.cancelNotification -> error", c)
        }
        $.xmo.idNotif = $.grep($.xmo.idNotif, function(a) {})
    }
}
,
$.xmo.scanWifiRPC = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("scanWifiRPC error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.remoteCall($.xpaths.trafficStats.rpc, "scanWifi", {
        Radio: a
    }, b),
    c.send(b, b)
}
,
$.xmo.uploadBMStatisticsFile = function(a, b, c, d) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("uploadBMStatisticsFile error: Not logged in");
    var e = $.xmo.client.newRequest();
    e.remoteCall($.xpaths.trafficStats.rpc, "uploadBMStatisticsFile", {
        startDate: a,
        endDate: b
    }),
    e.send(c, d)
}
,
$.xmo.clearAllBMStatistics = function(a) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("clearAllBMStatistics error: Not logged in");
    var b = $.xmo.client.newRequest();
    b.remoteCall($.xpaths.trafficStats.rpc, "clearAllBMStatistics", a),
    b.send(a)
}
,
$.xmo.autoCall = function(a, b, c, d, e, f) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("autoCall error: Not logged in");
    var g = $.xmo.client.newRequest();
    g.remoteCall(d, "autoCall", {
        LastName: a,
        FirstName: b,
        Number: c
    }),
    g.send(e, f)
}
,
$.xmo.reCall = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("reCall error: Not logged in");
    var d = $.xmo.client.newRequest();
    d.remoteCall(a, "reCall"),
    d.send(b, c)
}
,
$.xmo.acessTokenRequest = function(a, b, c, d, e, f) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("acessTokenRequest error: Not logged in");
    var g = $.xmo.client.newRequest();
    g.remoteCall($.xpaths.myCloud.rootCloud, "AccessTokenRequest", {
        State: a,
        Code: b,
        RedirectUri: c,
        Service: d
    }),
    g.send(e, f)
}
,
$.xmo.getLocalContents = function(a, b, c, d) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("getLocalContents error: Not logged in");
    var e = $.xmo.client.newRequest();
    e.remoteCall($.xpaths.rpc.logicalVolume.replace("#", a), "GetLocalContents", {
        Path: b
    }),
    e.send(c, d)
}
,
$.xmo.getCloudContents = function(a, b, c, d, e) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("getCloudContents error: Not logged in");
    var f = $.xmo.client.newRequest();
    f.remoteCall($.xpaths.myCloud.rootCloud, "GetCloudContents", {
        CloudUid: a,
        Path: b,
        IncludeDeleted: !1,
        Service: c
    }),
    f.send(d, e)
}
,
$.xmo.uploadFiles = function(a, b, c, d, e, f, g, h, i, j) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("uploadFiles error: Not logged in");
    var k = $.xmo.client.newRequest();
    k.remoteCall($.xpaths.myCloud.rootCloud, "AddSync", {
        VolumeId: e,
        LocalPathList: JSON.stringify([g]),
        Type: 2,
        Service: 0,
        CloudUid: b,
        CloudPath: f,
        Recursive: !0,
        Overwrite: !0,
        Periodicity: 0,
        Date: ""
    }),
    k.send(i, j)
}
,
$.xmo.downloadFiles = function(a, b, c, d, e, f) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("downloadFiles error: Not logged in");
    var g = $.xmo.client.newRequest()
      , h = "/";
    "/" !== d && (h = JSON.stringify([d])),
    g.remoteCall($.xpaths.myCloud.rootCloud, "AddSync", {
        VolumeId: b,
        LocalPathList: h,
        Type: 4,
        Service: 0,
        CloudUid: a,
        CloudPath: c,
        Recursive: !0,
        Overwrite: !0,
        Periodicity: 0,
        Date: ""
    }),
    g.send(e, f)
}
,
$.xmo.getBlockedReason = function(a, b, c, d) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("getBlockedReason error: Not logged in");
    var e = $.xmo.client.newRequest();
    e.remoteCall($.xpaths.accessControl.parentalControl.control.list, "getBlockingReason", {
        domainName: a,
        clientIpAddress: b
    }),
    e.send(c, d)
}
,
$.xmo.startPairing = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("getBlockedReason error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.remoteCall($.xpaths.dect.rpc.pairing, "startPairing"),
    c.send(a, b)
}
,
$.xmo.testDect = function(a, b, c) {
    try {
        if (a)
            $.xmo.testSingleDect(a, b, c);
        else {
            var d = $.xmo.client.newRequest();
            d.remoteCall($.xpaths.dect.rpc.test, "startPaging"),
            d.send(),
            b()
        }
    } catch (e) {
        c()
    }
}
,
$.xmo.testSingleDect = function(a, b, c) {
    try {
        var d = {};
        d[$.xpaths.dect.phyInterfaceTests.replace("#", a)] = $.constants.REQUESTED,
        $.xmo.setValuesFlat(d, {
            success: function() {
                b()
            },
            error: function() {
                c()
            }
        })
    } catch (e) {
        c()
    }
}
,
$.xmo.unPair = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("unPair error: Not logged in");
    var d = $.xmo.client.newRequest();
    d.remoteCall($.xpaths.dect.rpc.unPair.replace("#", a), "unPair"),
    d.send(b, c)
}
,
$.xmo.dhcpServerList = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("DHCP server list error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.remoteCall($.xpaths.trafficStats.rpc, "DhcpServerList"),
    c.send(function(b) {
        a(b.actions[0].callbacks[0].parameters)
    }, b)
}
,
$.xmo.arping = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("DHCP server list error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.remoteCall($.xpaths.trafficStats.rpc, "arping"),
    c.send(function(b) {
        a(b.actions[0].callbacks[0].parameters)
    }, b)
}
,
$.xmo.upnpLogs = function(a, b) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("Get UPNP Logs error: Not logged in");
    var c = $.xmo.client.newRequest();
    c.remoteCall($.xpaths.rpc.upnpLog, "getUpnpLogs", null),
    c.send(function(b) {
        a(b.actions[0].callbacks[0].parameters.UpnpLogs)
    }, b)
}
,
$.xmo.getUriLog = function(a, b, c) {
    if (!$.xmo.loggedin())
        throw new $.xmo.NotLoggedInError("Get URI Log error: Not logged in");
    var d = $.xmo.client.newRequest();
    d.remoteCall(a, "getVendorLogDownloadURI", {
        FileName: "logFile"
    }),
    d.send(function(a) {
        b(a.actions[0].callbacks[0].parameters.uri)
    }, c)
}
,
$.xmo.ListSync = function(a, b, c) {
    var d = $.xmo.client.newRequest();
    a = a || "",
    d.remoteCall($.xpaths.myCloud.rootCloud, "ListSync", {
        VolumeId: a
    }),
    d.send(function(a) {
        var c = a.actions[0].callbacks[0].parameters.SyncList;
        c = c.replace(/'/g, '"'),
        c = c.replace(/"LocalPathList":\//g, '"LocalPathList":"/'),
        c = c.replace(/,"CloudPath"/g, '","CloudPath"'),
        c = c.replace(/]","CloudPath"/g, '],"CloudPath"'),
        b(c ? JSON.parse(c) : [])
    }, c)
}
,
$.xmo.RemoveSyncAll = function(a) {
    var b = $.xmo.client.newRequest();
    b.remoteCall($.xpaths.myCloud.rootCloud, "RemoveSync", {
        VolumeId: a,
        SyncId: ""
    }),
    b.send()
}
,
$.xmo.RemoveSyncList = function(a, b) {
    var c = $.xmo.client.newRequest();
    for (var d in b)
        c.remoteCall($.xpaths.myCloud.rootCloud, "RemoveSync", {
            VolumeId: a,
            SyncId: b[d].SyncId
        });
    c.send()
}
,
$.xmo.deleteCloudAccount = function(a, b, c, d) {
    var e = $.xmo.client.newRequest();
    e.remoteCall($.xpaths.myCloud.rootCloud, "DeleteCloudAccount", {
        Service: a,
        CloudUid: b
    }),
    e.send(c, d)
}
,
$.xmo.listenMessageRPC = function(a, b) {
    var c = $.xmo.client.newRequest();
    c.remoteCall($.xpaths.voice.answeringMachine.oneMessage.replace("#uid#", a), "getMessageURI", {
        Type: 0
    }),
    c.send(function(a) {
        b.success(window.location.protocol + "//" + window.location.hostname + a.actions[0].callbacks[0].parameters.uri)
    }, function() {
        b.error()
    })
}
,
$.xmo.downloadCustomGreetings = function(a, b, c, d, e, f) {
    var g = $("#" + b);
    if (g.after(g.clone(!0)).hide(),
    g[0].files.length) {
        var h = $.xmo.client.newRequest();
        h._uploadFiles = $(h._uploadFiles.add(g)),
        h.remoteCall($.xpaths.voice.answeringMachine.oneMailbox.replace("#uid#", a), "downloadCustomGreetings", {
            FileName: b,
            Mode: c,
            Type: d
        }, void 0, function(a) {
            console.log(a)
        }, function(a) {
            console.log(a),
            a()
        }, {}),
        h.send(e, f)
    }
}
,
$.xmo.restartConnection = function(a, b, c, d) {
    var e = $.xmo.client.newRequest();
    e.remoteCall($.xpaths.rpc.pppInterface, "restartConnection"),
    e.send(c, d)
}
,
$.xmo.getModel = function() {
    $.xmo.init(),
    $.xmo.restoreFromCookie();
    var a = $.xmo.loggedin();
    if (!$.xmo.loggedin())
        try {
            $.xmo.login($.constants.guestUser, $.constants.guestPwd)
        } catch (b) {
            return ""
        }
    var c = $.xmo.getValuesTree($.xpaths.mySagemcomBox.deviceInfo.modelNumber);
    if (!a)
        try {
            $.xmo.logout(!0)
        } catch (d) {}
    return c
}
;
if (!!$ && !!$.xmo) {
    $.xmo.logger = {
        warn: function() {},
        log: function() {},
        info: function() {},
        error: function() {},
        trace: function() {}
    }
}
