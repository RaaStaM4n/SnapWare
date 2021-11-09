/*!
 * Copyright : (C) 2008,2009 SAGEM Communications - URD2
 *
 * This JavaScript file is the property of Sagem Communications
 * and may not be copied or used without prior written consent.
 *
 * vim: set fileencoding=utf-8
 */
(function(c, a, b) {
    a.clients = [];
    b.Client = function(d) {
        this._options = c.extend(true, {}, b.Client.defaults, d);
        if (this._options.dataModel === undefined) {
            this._options.dataModel = a.dataModel
        }
        this._reqIndex = 0;
        this._pendingRequests = [];
        this._connectedPages = [];
        a.clients.push(this);
        this._sessionId = "0";
        this.user = "";
        this._events = {};
        this._eventId = 1;
        this._eventCount = 0;
        this._eventRequest = null;
        this._ha1 = "";
        this.restoreFromCookie()
    }
    ;
    c.extend(b.Client.prototype, {
        setOptions: function(d) {
            this._options = c.extend(true, {}, this._options, d)
        },
        newRequest: function(d) {
            return new b.Request(this,d)
        },
        openSession: function(h, k, i, j, m) {
            var l = this
              , f = this._options.basicAuth;
            if (l.isConnected()) {
                l._clean()
            } else {
                l._reqIndex = 0
            }
            if (a.isObject(i)) {
                m = i;
                i = undefined
            } else {
                if (a.isObject(j)) {
                    m = j;
                    j = undefined
                }
            }
            var d = c.extend(true, {}, this._options, {
                synchronous: true,
                priority: true
            }, m);
            if (!a.isFunction(i)) {
                i = d.authenticationResponseFunc
            }
            if (!a.isFunction(j)) {
                j = d.authenticationErrorFunc
            }
            function e(n, o) {
                l._clean();
                j.call(this, n, o)
            }
            if (h !== undefined) {
                l.user = h
            }
            if (!f) {
                if (k !== undefined) {
                    l._md5Pass = hex_md5(k)
                }
                l._nonce = "";
                l._ha1 = hex_md5(l.user + "::" + l._md5Pass)
            }
            var g = this.newRequest(d);
            g.openSession(h, k, function(o, n) {
                l._sessionId = o;
                if (f) {
                    l._password = k
                } else {
                    l._nonce = n;
                    l._ha1 = hex_md5(h + ":" + n + ":" + l._md5Pass)
                }
                l.saveToCookie();
                c.each(l._connectedPages, function(p, q) {
                    q.reload()
                });
                i.call(this, o)
            }, e, d);
            g.send({
                ajaxErrorFunc: e
            })
        },
        closeSession: function(d, g, f) {
            var e = this;
            if (e.isConnected()) {
                if (a.isObject(d)) {
                    f = d;
                    d = undefined
                } else {
                    if (a.isObject(g)) {
                        f = g;
                        g = undefined
                    }
                }
                var h = c.extend(true, {}, this._options, {
                    synchronous: true
                }, f);
                if (!a.isFunction(d)) {
                    d = h.authenticationResponseFunc
                }
                if (!a.isFunction(g)) {
                    g = function() {
                        e._clean();
                        return false
                    }
                }
                var i = this.newRequest(h);
                i.closeSession(function() {
                    e._clean();
                    d.call(this)
                });
                i.send(function() {}, g)
            } else {
                e._clean()
            }
        },
        isConnected: function() {
            return (this._sessionId !== "0")
        },
        restoreFromCookie: function() {
            if (a.opt.GUI_SAVE_LOGIN_OPT && this._options.cookie) {
                var e = c.cookie(this._options.cookie, {
                    path: "/"
                });
                if (e) {
                    try {
                        e = JSON.parse(e);
                        if (e.sess_id != "0") {
                            this._sessionId = e.sess_id;
                            this._reqIndex = e.req_id;
                            this._options.basicAuth = e.basic;
                            this._options.dataModel = e.dataModel;
                            this.user = e.user;
                            if (e.basic) {
                                this._password = e.password
                            } else {
                                this._ha1 = e.ha1;
                                if (e.ha1.length == 64) {
                                    this._ha1 = e.ha1.substr(0, 10) + e.ha1.substr(10 + 32);
                                    this._md5Pass = e.ha1.substr(10, 32)
                                }
                                this._nonce = e.nonce
                            }
                        }
                    } catch (d) {
                        this._clean()
                    }
                }
            }
        },
        saveToCookie: function() {
            if (a.opt.GUI_SAVE_LOGIN_OPT && this._options.cookie) {
                var e = this._options.basicAuth
                  , d = new Date();
                var f = {
                    req_id: this._reqIndex,
                    sess_id: this._sessionId,
                    basic: e,
                    user: this.user,
                    dataModel: this._options.dataModel
                };
                if (e) {
                    f.password = this._password
                } else {
                    f.ha1 = this._ha1;
                    if (this._ha1.length == 32) {
                        f.ha1 = this._ha1.substr(0, 10) + this._md5Pass + this._ha1.substr(10)
                    }
                    f.nonce = this._nonce
                }
                d.setTime(d.getTime() + (24 * 60 * 60) * 1000);
                c.cookie(this._options.cookie, JSON.stringify(f), {
                    expires: d,
                    path: "/"
                })
            }
        },
        addEvent: function(e) {
            var d = String(this._eventId++);
            this._events[d] = e;
            this._eventCount++;
            return d
        },
        removeEvent: function(d) {
            if (d === undefined) {
                this._events = {};
                this._eventCount = 0
            } else {
                delete this._events[d];
                this._eventCount--
            }
            if (this._options.autoRequestForEvents && (this._eventCount === 0) && (this._eventRequest !== null)) {
                var e = this._eventRequest;
                this._eventRequest = null;
                e.ajaxRequest.abort()
            }
        },
        requestForEvents: function() {
            if (this._options.autoRequestForEvents && (this._eventRequest === null)) {
                this.getNotificationEvents()
            }
        },
        getNotificationEvents: function(f, e) {
            if (a.isObject(f)) {
                e = f;
                f = undefined
            }
            var d = this, i, h = c.extend(true, {}, this._options, {
                ajaxTimeout: 0,
                ajaxRetry: true,
                requestErrorFunc: function(j, k) {
                    if (j.code === a.XMO_NEW_GETEVENTS_ERR) {
                        return true
                    }
                    if (i !== d._eventRequest) {
                        return false
                    }
                    if (j.code === a.XMO_FLUSH_GET_EVENTS_ERR) {
                        return true
                    }
                    if (a.isFunction(f)) {
                        f.call(this, j)
                    }
                    d._eventRequest = null;
                    return a.api.Client.defaults.requestErrorFunc.call(this, j, k)
                }
            }, e);
            i = this.newRequest(h);
            this._eventRequest = i;
            i.getNotificationEvents();
            var g = this._events;
            i.send(function(j) {
                var k = j.events;
                if (k !== undefined) {
                    c(k).each(function(l) {
                        var m = g[String(this.id)];
                        if (m !== undefined) {
                            m(this)
                        }
                    })
                }
                if ((d._eventRequest !== null) && (j.error.code !== a.XMO_NEW_GETEVENTS_ERR)) {
                    d._eventRequest = null;
                    if (!d._options.autoRequestForEvents || (d._eventCount > 0)) {
                        if (j.error.code === a.XMO_FLUSH_GET_EVENTS_ERR) {
                            setTimeout(function() {
                                d.getNotificationEvents(e)
                            }, d._options.getEventsRetryDelay * 1000)
                        } else {
                            d.getNotificationEvents(e)
                        }
                    }
                }
            })
        },
        abortNotificationEvents: function() {
            var d = this._eventRequest;
            if (d !== null) {
                this._eventRequest = null;
                d.ajaxRequest.abort()
            }
        },
        resetNotifications: function(d, g, f) {
            if (a.isObject(d)) {
                f = d;
                d = undefined
            } else {
                if (a.isObject(g)) {
                    f = g;
                    g = undefined
                }
            }
            var h = c.extend(true, {}, this._options, {
                synchronous: true,
                priority: false
            }, f);
            if (!a.isFunction(d)) {
                d = function() {}
            }
            if (!a.isFunction(g)) {
                g = function() {
                    e._clean();
                    return false
                }
            }
            var e = this
              , i = this.newRequest(h);
            i.resetNotifications();
            i.send(function() {
                e.removeEvent();
                d.call(e)
            }, g)
        },
        hashPassword: function(d) {
            return hex_md5(d)
        },
        getPassword: function() {
            return this._md5Pass
        },
        addPage: function(d) {
            this._connectedPages.push(d)
        },
        removePage: function(d) {
            this._connectedPages.splice(c.inArray(this._connectedPages, d), 1)
        },
        _clean: function() {
            this._sessionId = "0";
            this._reqIndex = 0;
            this.user = "";
            this._password = "";
            this._ha1 = "";
            this._options.basicAuth = false;
            this._eventRequest = null;
            this._events = {};
            this._eventId = 1;
            this._eventCount = 0;
            if (a.opt.GUI_SAVE_LOGIN_OPT && this._options.cookie) {
                c.cookie(this._options.cookie, null, {
                    path: "/"
                })
            }
            c.each(this._pendingRequests, function() {
                this.ajaxRequest.abort()
            });
            this._pendingRequests = []
        }
    });
    c.extend(b.Client.prototype, {
        authenticate: b.Client.prototype.openSession,
        close: b.Client.prototype.closeSession
    });
    c.extend(b.Client, {
        defaults: {
            ajaxTimeout: a.opt.GUI_AJAX_TIMEOUT_OPT * 1000,
            lang: "en",
            refreshTimer: 5,
            basicAuth: false,
            cookie: "session",
            notifyCurrentValue: false,
            autoRequestForEvents: true,
            getEventsRetryDelay: 15,
            synchronous: false,
            priority: false,
            ajaxRetry: false,
            ajaxRetryTimer: 5,
            requestResponseFunc: function(d) {
                return true
            },
            requestErrorFunc: function(d, e) {
                if ((d.code === a.XMO_INVALID_SESSION_ERR) || (d.code === a.XMO_SESSION_LOGOUT_ERR) || (d.code === a.XMO_SESSION_TIMEOUT_ERR)) {
                    if (this.client.isConnected()) {
                        this.client._clean();
                        a.openLoginForm(d)
                    }
                } else {
                    if (d.code === a.XMO_REQUEST_ACTION_ERR) {
                        return true
                    } else {
                        if (d.code == a.XMO_REQUEST_ID_ERR) {
                            a.alert("Session expired")
                        } else {
                            a.alert("Request error(0x%08x): %s", d.code, d.description)
                        }
                        this.client._clean();
                        a.refreshPage()
                    }
                }
                return false
            },
            ajaxErrorFunc: function(d) {
                return false
            },
            actionResponseFunc: function(e, d) {
                return true
            },
            actionErrorFunc: function(d, e) {
                return false
            },
            authenticationResponseFunc: function(e, d) {
                return true
            },
            authenticationErrorFunc: function(d, e) {
                a.alert("Authentication error(0x%08x): %s", d.code, d.description);
                if (d.code === a.XMO_SESSION_TIMEOUT_ERR) {}
            }
        }
    });
    b.Request = function(d, e) {
        this.client = d;
        this._options = c.extend(true, {}, d._options, e);
        this.actions = [];
        this._uploadFiles = c([])
    }
    ;
    c.extend(b.Request.prototype, {
        _extendOptions: function(h, d, f, e) {
            if (a.isObject(d)) {
                e = d;
                d = undefined
            } else {
                if (a.isObject(f)) {
                    e = f;
                    f = undefined
                }
            }
            var g = {};
            if (a.isFunction(d)) {
                g[h + "ResponseFunc"] = d
            }
            if (a.isFunction(f)) {
                g[h + "ErrorFunc"] = f
            }
            return c.extend(true, {}, this._options, e, g)
        },
        send: function(l, m, o) {
            var d = this._extendOptions("request", l, m, o);
            var k = this, j = this.actions, g = this.client, h = g._pendingRequests, f, e = "", n = "";
            var i = new Array();
            idxPacket = -1;
            for (idxActions = 0; idxActions < j.length; idxActions++) {
                if (idxActions % 90 == 0) {
                    idxPacket++;
                    i[idxPacket] = new Array()
                }
                i[idxPacket].push(j[idxActions])
            }
            if (i.length) {
                c(i).each(function(q) {
                    var t = {
                        request: {
                            id: 0,
                            "session-id": g._sessionId,
                            priority: d.priority,
                            actions: []
                        }
                    };
                    c(i[q]).each(function(u) {
                        t.request.actions.push(this.request)
                    });
                    var s = function(x) {
                        h.splice(c.inArray(k, h), 1);
                        val = c(x).find("body");
                        if (val.length) {
                            x = val.text();
                            x = JSON.parse(x)
                        }
                        var v = x.reply.error;
                        var w = true;
                        var u = x.reply.actions;
                        v.description = a.i18n.msg(v.description);
                        if (v.code !== a.XMO_REQUEST_NO_ERR) {
                            w = d.requestErrorFunc.call(k, v, x.reply)
                        }
                        if (w && (u !== undefined)) {
                            c(u).each(function(z) {
                                var B = this
                                  , y = this.error
                                  , A = j[this.id];
                                y.description = a.i18n.msg(y.description);
                                if (B.callbacks !== undefined) {
                                    c.each(B.callbacks, function(C) {
                                        this.result.description = a.i18n.msg(this.result.description)
                                    })
                                }
                                if (y.code === a.XMO_NO_ERR) {
                                    if (B.callbacks !== undefined) {
                                        c.each(B.callbacks, function(C) {
                                            A.respFunc(B, this)
                                        })
                                    }
                                } else {
                                    if (y.code === a.XMO_ACTION_CALLBACK_ERR) {
                                        c.each(B.callbacks, function(C) {
                                            if (this.result.code === a.XMO_NO_ERR) {
                                                A.respFunc(B, this)
                                            } else {
                                                A.errFunc(this.result, B, this)
                                            }
                                        })
                                    } else {
                                        A.errFunc(y, B)
                                    }
                                }
                            });
                            d.requestResponseFunc.call(k, x.reply)
                        }
                        k.actions = []
                    };
                    var p, r;
                    r = function(u, v, w) {
                        h.splice(c.inArray(k, h), 1);
                        if (d.ajaxRetry && g.isConnected()) {
                            setTimeout(p, d.ajaxRetryTimer * 1000)
                        } else {
                            d.ajaxErrorFunc.call(k, {
                                code: 1,
                                description: c.sprintf('Ajax error: "%s"', v)
                            })
                        }
                    }
                    ;
                    p = function() {
                        f = g._reqIndex++;
                        if (g._reqIndex > a.UINTMAX) {
                            g._reqIndex = 1
                        }
                        g.saveToCookie();
                        t.request.id = f;
                        if (!g._options.basicAuth) {
                            n = c.random(a.UINTMAX);
                            lNonce = "";
                            if (g._nonce != undefined && g._nonce != "") {
                                lNonce = g._nonce
                            }
                            g._ha1 = hex_md5(g.user + ":" + lNonce + ":" + g._md5Pass);
                            e = hex_md5(g._ha1 + ":" + f + ":" + n + ":JSON:/cgi/json-req");
                            c.extend(t.request, {
                                cnonce: n,
                                "auth-key": e
                            })
                        }
                        var w = JSON.stringify(t);
                        if (c.browser.msie && parseInt(c.browser.version, 10) === 8) {
                            w = unescape(w.replace(/\\u/g, "%u"))
                        }
                        var v = {
                            req: w
                        };
                        if (k._uploadFiles.length) {
                            var u = c('<form action="' + a.opt.XMO_REMOTE_HOST + '/cgi/upload" method="POST" enctype="multipart/form-data"></form>').appendTo("body").hide().append(k._uploadFiles).ajaxSubmit({
                                url: a.opt.XMO_REMOTE_HOST + "/cgi/upload",
                                dataType: "xml",
                                data: v,
                                semantic: false,
                                timeout: d.ajaxTimeout * 1000,
                                beforeSend: function(x) {
                                    k.ajaxRequest = x
                                },
                                success: function(z, x, y) {
                                    u.remove();
                                    s(z);
                                    k._uploadFiles = c([])
                                },
                                error: function(x, y, z) {
                                    u.remove();
                                    r(x, y, z);
                                    k._uploadFiles = c([])
                                }
                            })
                        } else {
                            k.ajaxRequest = c.ajax({
                                type: "POST",
                                url: a.opt.XMO_REMOTE_HOST + "/cgi/json-req",
                                dataType: "json",
                                data: v,
                                async: !d.synchronous,
                                timeout: d.ajaxTimeout * 1000,
                                cache: false,
                                success: s,
                                error: r
                            })
                        }
                    }
                    ;
                    p()
                })
            }
        },
        openSession: function(h, k, i, j, l) {
            var d = this._extendOptions("authentication", i, j, l)
              , f = this.client
              , g = d.basicAuth
              , e = {
                user: h,
                persistent: "true",
                "session-options": c.extend(true, {
                    nss: d.dataModel.nss,
                    language: (a.opt.GUI_I18N_CGI_OPT ? a.language.lang : "ident"),
                    "context-flags": {
                        "get-content-name": true,
                        "local-time": true
                    },
                    "capability-depth": 2,
                    "capability-flags": {
                        name: true,
                        "default-value": false,
                        restriction: true,
                        description: false
                    },
                    "time-format": "ISO_8601"
                }, d.session)
            };
            if (g) {
                e.password = k
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "logIn",
                    parameters: e
                },
                respFunc: function(n, m) {
                    d.authenticationResponseFunc.call(this, m.parameters.id, m.parameters.nonce)
                },
                errFunc: d.authenticationErrorFunc,
                options: d
            })
        },
        closeSession: function(d, f, e) {
            var g = this._extendOptions("action", d, f, e);
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "logOut"
                },
                respFunc: function(i, h) {
                    g.actionResponseFunc.call(this)
                },
                errFunc: g.actionErrorFunc,
                options: g
            })
        },
        getValue: function(e, d, g, f) {
            var h = this._extendOptions("action", d, g, f)
              , i = {
                id: this.actions.length,
                method: "getValue",
                xpath: e
            };
            if (h.sessionOptions) {
                i.options = h.sessionOptions
            } else {
                if (h["session-options"]) {
                    i.options = h["session-options"]
                }
            }
            this.actions.push({
                request: i,
                respFunc: function(m, j) {
                    var n = j.parameters.value;
                    if (a.isObject(n)) {
                        for (var l in n) {
                            if (n.hasOwnProperty(l)) {
                                n = n[l];
                                break
                            }
                        }
                    }
                    h.actionResponseFunc.call(this, n, new b.Capability(j.parameters.capability), j.xpath)
                },
                errFunc: h.actionErrorFunc,
                options: h
            })
        },
        getDefaultValue: function(e, d, g, f) {
            var h = this._extendOptions("action", d, g, f)
              , i = {
                id: this.actions.length,
                method: "getDefaultValue",
                xpath: e
            };
            if (h.sessionOptions) {
                i.options = h.sessionOptions
            } else {
                if (h["session-options"]) {
                    i.options = h["session-options"]
                }
            }
            this.actions.push({
                request: i,
                respFunc: function(m, j) {
                    var n = j.parameters.value;
                    if (a.isObject(n)) {
                        for (var l in n) {
                            if (n.hasOwnProperty(l)) {
                                n = n[l];
                                break
                            }
                        }
                    }
                    h.actionResponseFunc.call(this, n, new b.Capability(j.parameters.capability), j.xpath)
                },
                errFunc: h.actionErrorFunc,
                options: h
            })
        },
        setValue: function(e, i, d, g, f) {
            var h = this._extendOptions("action", d, g, f);
            if (e != undefined && e.indexOf("WiFi") == -1 && e.indexOf("DynamicDNS") == -1) {
                i = c.gui.fval(i);
                i = c.gui.fec(i)
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "setValue",
                    xpath: e,
                    parameters: {
                        value: i
                    }
                },
                respFunc: h.actionResponseFunc,
                errFunc: h.actionErrorFunc,
                options: h
            })
        },
        addChild: function(i, j, e, g, f) {
            var h = this._extendOptions("action", e, g, f);
            var k = {};
            if (h.uid !== undefined) {
                k.uid = h.uid
            }
            if (h.childType !== undefined) {
                var d = {};
                d[h.childType] = j;
                j = d
            }
            if (j !== undefined && j !== {}) {
                k.value = j
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "addChild",
                    xpath: i,
                    parameters: k
                },
                respFunc: h.actionResponseFunc,
                errFunc: h.actionErrorFunc,
                options: h
            })
        },
        deleteElement: function(e, d, g, f) {
            var h = this._extendOptions("action", d, g, f);
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "deleteChild",
                    xpath: e
                },
                respFunc: h.actionResponseFunc,
                errFunc: h.actionErrorFunc,
                options: h
            })
        },
        onValueChange: function(k, l, i, j, m) {
            var g = this.client
              , h = false
              , e = this._extendOptions("action", i, j, m)
              , d = this.actions.length
              , f = g.addEvent(function(n) {
                if (n != undefined && n.parameters != undefined && n.parameters.capability != undefined && n.xpath != undefined) {
                    l.call(this, n.parameters.value, new b.Capability(n.parameters.capability), n.xpath)
                } else {
                    h = true
                }
            });
            if (e.notifyCurrentValue) {
                _currentValue = e.notifyCurrentValue
            } else {
                if (e.currentValue) {
                    _currentValue = e.currentValue
                } else {
                    _currentValue = false
                }
            }
            if (h == false) {
                this.actions.push({
                    request: {
                        id: this.actions.length,
                        method: "subscribeForNotification",
                        xpath: k,
                        parameters: {
                            id: f,
                            type: "value-change",
                            "current-value": _currentValue
                        }
                    },
                    respFunc: function(o, n) {
                        e.actionResponseFunc.call(this, o, n);
                        g.requestForEvents()
                    },
                    errFunc: function(n, o) {
                        g.removeEvent(f);
                        e.actionErrorFunc.call(this, n, o)
                    },
                    options: e
                })
            }
            return f
        },
        onPeriodicValue: function(k, l, i, j, m) {
            var g = this.client
              , h = false
              , e = this._extendOptions("action", i, j, m)
              , d = this.actions.length
              , f = g.addEvent(function(n) {
                if (n != undefined && n.parameters != undefined && n.parameters.capability != undefined && n.xpath != undefined) {
                    l.call(this, n.parameters.value, new b.Capability(n.parameters.capability), n.xpath)
                } else {
                    h = true
                }
            });
            if (e.notifyCurrentValue) {
                _currentValue = e.notifyCurrentValue
            } else {
                if (e.currentValue) {
                    _currentValue = e.currentValue
                } else {
                    _currentValue = false
                }
            }
            if (h == false) {
                this.actions.push({
                    request: {
                        id: this.actions.length,
                        method: "subscribeForNotification",
                        xpath: k,
                        parameters: {
                            id: f,
                            type: "periodic",
                            timer: e.refreshTimer,
                            "current-value": _currentValue
                        }
                    },
                    respFunc: function(o, n) {
                        e.actionResponseFunc.call(this, o, n);
                        g.requestForEvents()
                    },
                    errFunc: function(n, o) {
                        g.removeEvent(f);
                        e.actionErrorFunc.call(this, n, o)
                    },
                    options: e
                })
            }
            return f
        },
        onAddChild: function(j, k, h, i, l) {
            var g = this.client
              , e = this._extendOptions("action", h, i, l)
              , d = this.actions.length
              , f = g.addEvent(function(n) {
                var o = n.parameters.value;
                if (a.isObject(o)) {
                    for (var m in o) {
                        if (o.hasOwnProperty(m)) {
                            o = o[m];
                            break
                        }
                    }
                }
                k.call(this, o, new b.Capability(n.parameters.capability), n.xpath)
            });
            if (e.notifyCurrentValue) {
                _currentValue = e.notifyCurrentValue
            } else {
                if (e.currentValue) {
                    _currentValue = e.currentValue
                } else {
                    _currentValue = false
                }
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "subscribeForNotification",
                    xpath: j,
                    parameters: {
                        id: f,
                        type: "add-child",
                        "current-value": _currentValue
                    }
                },
                respFunc: function(n, m) {
                    e.actionResponseFunc.call(this, n, m);
                    g.requestForEvents()
                },
                errFunc: function(m, n) {
                    g.removeEvent(f);
                    e.actionErrorFunc.call(this, m, n)
                },
                options: e
            });
            return f
        },
        onDeleteChild: function(j, k, h, i, l) {
            var g = this.client
              , e = this._extendOptions("action", h, i, l)
              , d = this.actions.length
              , f = g.addEvent(function(m) {
                k.call(this, m.uid, m.xpath, m.type)
            });
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "subscribeForNotification",
                    xpath: j,
                    parameters: {
                        id: f,
                        type: "delete-child"
                    }
                },
                respFunc: function(n, m) {
                    e.actionResponseFunc(this, n, m);
                    g.requestForEvents()
                },
                errFunc: function(m, n) {
                    g.removeEvent(f);
                    e.actionErrorFunc.call(this, m, n)
                },
                options: e
            });
            return f
        },
        onGlobalChange: function(l, f, i, m, j, k, n) {
            var h = this.client
              , e = this._extendOptions("action", j, k, n)
              , d = this.actions.length
              , g = h.addEvent(function(p) {
                if (p.type == "ADDED") {
                    var q = p.parameters.value;
                    if (a.isObject(q)) {
                        for (var o in q) {
                            if (q.hasOwnProperty(o)) {
                                q = q[o];
                                break
                            }
                        }
                    }
                    f.call(this, q, new b.Capability(p.parameters.capability), p.xpath)
                } else {
                    if (p.type == "DELETED") {
                        i.call(this, p.uid, p.xpath, p.type)
                    } else {
                        if (p.type == "VALUE_CHANGE") {
                            if (p != undefined && p.parameters != undefined && p.parameters.capability != undefined && p.xpath != undefined) {
                                m.call(this, p.parameters.value, new b.Capability(p.parameters.capability), p.xpath)
                            } else {
                                fail = true
                            }
                        }
                    }
                }
            });
            if (e.notifyCurrentValue) {
                _currentValue = e.notifyCurrentValue
            } else {
                if (e.currentValue) {
                    _currentValue = e.currentValue
                } else {
                    _currentValue = false
                }
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "subscribeForNotification",
                    xpath: l,
                    parameters: {
                        id: g,
                        type: "global",
                        "current-value": _currentValue
                    }
                },
                respFunc: function(p, o) {
                    e.actionResponseFunc.call(this, p, o);
                    h.requestForEvents()
                },
                errFunc: function(o, p) {
                    h.removeEvent(g);
                    e.actionErrorFunc.call(this, o, p)
                },
                options: e
            });
            return g
        },
        onDelete: function(j, k, h, i, l) {
            var g = this.client
              , e = this._extendOptions("action", h, i, l)
              , d = this.actions.length
              , f = g.addEvent(function(m) {
                k.call(this, m.uid, m.xpath, m.type)
            });
            this.actions.push({
                request: {
                    id: d,
                    method: "subscribeForNotification",
                    xpath: j,
                    parameters: {
                        id: f,
                        type: "delete-element"
                    }
                },
                respFunc: function(n, m) {
                    e.actionResponseFunc(this, n, m);
                    g.requestForEvents()
                },
                errFunc: function(m, n) {
                    g.removeEvent(f);
                    e.actionErrorFunc.call(this, m, n)
                },
                options: e
            });
            return f
        },
        deleteNotification: function(e, d, g, f) {
            var i = this._extendOptions("action", d, g, f)
              , h = this.client._events;
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "unsubscribeForNotification",
                    parameters: {
                        id: e
                    }
                },
                respFunc: function(j, k) {
                    delete h[e];
                    i.actionResponseFunc.call(this, k)
                },
                errFunc: i.actionErrorFunc,
                options: i
            })
        },
        getNotificationEvents: function(e, d) {
            if (a.isObject(e)) {
                d = e;
                e = undefined
            }
            var f = c.extend(true, {}, this._options, d);
            if (a.isFunction(e)) {
                f.actionErrorFunc = e
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "getEvents"
                },
                respFunc: f.actionResponseFunc,
                errFunc: f.actionErrorFunc,
                options: f
            })
        },
        resetNotifications: function(e, d) {
            if (a.isObject(e)) {
                d = e;
                e = undefined
            }
            var f = c.extend(true, {}, this._options, d);
            if (a.isFunction(e)) {
                f.actionErrorFunc = e
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "resetEvents"
                },
                respFunc: f.actionResponseFunc,
                errFunc: f.actionErrorFunc,
                options: f
            })
        },
        remoteCall: function(k, d, h, l, i, j, n) {
            var g = this.client, e = this._extendOptions("action", i, j, n), m = this.client._events, f;
            if (a.isFunction(l)) {
                f = g.addEvent(function(o) {
                    l.call(this, o.parameters.value, o.xpath, o.type)
                });
                g.requestForEvents()
            }
            if (d === "reboot") {
                h = {
                    source: "GUI"
                }
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: d,
                    xpath: k,
                    parameters: h,
                    "event-id": f
                },
                respFunc: function(p, o) {
                    if (f !== undefined) {
                        g.removeEvent(f)
                    }
                    e.actionResponseFunc.call(this, o.parameters, o.result, o.xpath)
                },
                errFunc: function(o, p) {
                    if (f !== undefined) {
                        g.removeEvent(f)
                    }
                    e.actionErrorFunc.call(this, o, p)
                },
                options: e
            });
            return f
        },
        downloadFile: function(e, h, d, g, f) {
            if (a.isFunction(h)) {
                h = "";
                d = h;
                g = d;
                f = g
            }
            var i = this._extendOptions("action", d, g, f);
            this.remoteCall(e, "getDownloadURI", {
                FileName: h
            }, undefined, function(l, k, j) {
                window.location.href = l.uri;
                i.actionResponseFunc.call(this, l, k, j)
            }, i.actionErrorFunc, i)
        },
        downloadSpecificFile: function(e, h, j, d, g, f) {
            if (a.isFunction(h)) {
                h = "";
                d = h;
                g = d;
                f = g
            }
            var i = this._extendOptions("action", d, g, f);
            this.remoteCall(e, "getDownloadURI", {
                FileName: h,
                Type: j
            }, undefined, function(m, l, k) {
                window.location.href = m.uri;
                i.actionResponseFunc.call(this, m, l, k)
            }, i.actionErrorFunc, i)
        },
        uploadFile: function(f, i, d, h, g) {
            var e = c(i);
            e.after(e.clone(true)).hide();
            this._uploadFiles = c(this._uploadFiles.add(e));
            this.remoteCall(f, "restoreFrom", {
                Source: "FILE",
                FileName: e.attr("name")
            }, undefined, d, h, g)
        },
        uploadEncryptedFile: function(f, i, j, d, h, g) {
            var e = c(i);
            e.after(e.clone(true)).hide();
            this._uploadFiles = c(this._uploadFiles.add(e));
            this.remoteCall(f, "restoreFrom", {
                Source: "FILE",
                FileName: e.attr("name"),
                cryptKey: j
            }, undefined, d, h, g)
        },
        uploadSpecificFile: function(f, i, j, k, d, h, g) {
            var e = c(i);
            e.after(e.clone(true)).hide();
            this._uploadFiles = c(this._uploadFiles.add(e));
            this.remoteCall(f, "restoreFrom", {
                Source: "FILE",
                FileName: e.attr("name"),
                Type: j,
                EncryptedFileName: k
            }, undefined, d, h, g)
        },
        firmwareUpgrade: function(f, k, d, h, g) {
            var j = this._extendOptions("action", d, h, g)
              , e = c(k)
              , i = {
                FIRMWARE: "1 Firmware Upgrade Image",
                GUI: "2 Web Content"
            };
            if (!a.isString(j.fileType) || !i[j.fileType]) {
                j.fileType = "FIRMWARE"
            }
            e.after(e.clone(true)).hide();
            this._uploadFiles = c(this._uploadFiles.add(e));
            this.remoteCall(f, "download", {
                id: "0",
                fileType: i[j.fileType],
                url: "file://" + e.attr("name")
            }, undefined, d, h, g)
        }
    });
    c.extend(b.Request.prototype, {
        deleteElements: b.Request.prototype.deleteElement
    });
    c(window).unload(function() {
        c.each(a.clients, function() {
            c.each(this._pendingRequests, function() {
                this.ajaxRequest.abort()
            })
        })
    })
}(jQuery, jQuery.gui, jQuery.gui.api));
(function(c, a, b) {
    b.Capability = function(g) {
        c.extend(this, g);
        var j, f;
        var e = this.getAttributes();
        var h = this.getChildren();
        for (j = 0; j < e.length; j++) {
            e[j] = new b.Capability(e[j]);
            f = e[j].getName();
            e[f] = e[j]
        }
        if (this.interfaces !== undefined) {
            c.each(this.interfaces, function(l) {
                var k = this;
                c.each(k.commands, function(m) {
                    var n = this["input-parameters"];
                    if (n !== undefined) {
                        for (m = 0; m < n.length; m++) {
                            n[m] = new b.Capability(n[m])
                        }
                    }
                })
            })
        }
        for (j = 0; j < h.length; j++) {
            h[j] = new b.Capability(h[j]);
            f = h[j].getName();
            h[f] = h[j]
        }
        if (!a.opt.GUI_I18N_CGI_OPT) {
            if (this.description) {
                this.description = a.i18n.msg(this.description)
            }
            var d = this.getEnumValues();
            for (j = 0; j < d.length; j++) {
                d[j].description = a.i18n.msg(d[j].description)
            }
        }
    }
    ;
    c.extend(b.Capability.prototype, {
        getName: function() {
            return this.name
        },
        getDescription: function() {
            return this.description
        },
        isKindOf: function(g) {
            if (this.type) {
                var f = this.type.split(" ");
                var h = g.split(" ");
                for (var e = 0; e < f.length; e++) {
                    for (var d = 0; d < h.length; d++) {
                        if (f[e] === h[d]) {
                            return true
                        }
                    }
                }
            }
            return false
        },
        getAttributes: function() {
            return this.attributes || []
        },
        getFlags: function() {
            return this.flags
        },
        getChildren: function() {
            return this.children || []
        },
        getEnumValues: function() {
            if (this.restrictions && (this.restrictions["enum-values"] !== undefined)) {
                return this.restrictions["enum-values"]
            } else {
                return []
            }
        },
        getEnum: function(f) {
            var d = this.getEnumValues();
            f = String(f);
            for (var e = 0; e < d.length; e++) {
                if ((d[e].value === f) || (d[e].name === f)) {
                    return d[e]
                }
            }
        },
        getDefaultValue: function() {
            return this["default-value"]
        },
        getMaxLength: function() {
            if (this.restrictions && (this.restrictions["max-length"] !== undefined)) {
                return this.restrictions["max-length"]
            }
        },
        getMinLength: function() {
            if (this.restrictions && (this.restrictions["min-length"] !== undefined)) {
                return this.restrictions["min-length"]
            }
        },
        getMaxValueInclusive: function() {
            if (this.restrictions && (this.restrictions["max-value-inclusive"] !== undefined)) {
                return this.restrictions["max-value-inclusive"]
            }
        },
        getMinValueInclusive: function() {
            if (this.restrictions && (this.restrictions["min-value-inclusive"] !== undefined)) {
                return this.restrictions["min-value-inclusive"]
            }
        },
        getMaxValueExclusive: function() {
            if (this.restrictions && (this.restrictions["max-value-exclusive"] !== undefined)) {
                return this.restrictions["max-value-exclusive"]
            }
        },
        getMinValueExclusive: function() {
            if (this.restrictions && (this.restrictions["min-value-exclusive"] !== undefined)) {
                return this.restrictions["min-value-exclusive"]
            }
        },
        getRegexPattern: function() {
            if (this.restrictions && (this.restrictions["reg-exp"] !== undefined) && (this.restrictions["reg-exp"].pattern !== undefined)) {
                return this.restrictions["reg-exp"].pattern
            }
        },
        isRegexIgnoreCase: function() {
            if (this.restrictions && (this.restrictions["reg-exp"] !== undefined)) {
                return Boolean(this.restrictions["reg-exp"]["ignore-case"])
            }
            return false
        }
    })
}(jQuery, jQuery.gui, jQuery.gui.api));
(function(c, a, b) {
    b.DataRequest = function(d) {
        this._options = c.extend(true, {}, d);
        this.actions = []
    }
    ;
    c.extend(b.DataRequest.prototype, {
        send: function(d, f, e) {
            if ((d !== undefined) && !c.isFunction(d)) {
                e = d;
                d = undefined
            } else {
                if ((f !== undefined) && !c.isFunction(f)) {
                    e = f;
                    f = undefined
                }
            }
            var g = c.extend(true, this._options, e);
            if (d === undefined) {
                d = g.request.respFunc
            }
            if (f === undefined) {
                f = g.request.errFunc
            }
            var h = this
              , i = this.actions;
            if (i.length) {
                c(i).each(function(j) {
                    this.process(h._data)
                })
            }
        },
        getValue: function(e, d, g, f) {
            var h = c.extend(true, {}, this._options, f);
            if (d === undefined) {
                d = h.action.respFunc
            }
            if (g === undefined) {
                g = h.action.errFunc
            }
            this.actions.push({
                method: "getValue",
                xpath: e,
                process: function(j, i) {
                    d.call(this, i)
                },
                errFunc: g,
                options: h
            })
        },
        setValue: function(e, i, d, g, f) {
            var h = c.extend(true, {}, this._options, f);
            if (d === undefined) {
                d = h.action.respFunc
            }
            if (g === undefined) {
                g = h.action.errFunc
            }
            i = c.gui.fval(i);
            i = c.gui.fec(i);
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "setValue",
                    xpath: e,
                    parameters: {
                        value: i
                    }
                },
                respFunc: d,
                errFunc: g,
                options: h
            })
        },
        addChild: function(i, j, e, g, f) {
            if (!c.isFunction(e)) {
                f = e;
                e = undefined
            } else {
                if (!c.isFunction(g)) {
                    f = g;
                    g = undefined
                }
            }
            var h = c.extend(true, {}, this._options, f);
            var k = {};
            if (h.uid !== undefined) {
                k.uid = h.uid
            }
            if (h.childType !== undefined) {
                var d = {};
                d[h.childType] = j;
                j = d
            }
            if (j !== undefined || j !== {}) {
                k.value = j
            }
            if (e === undefined) {
                e = h.action.respFunc
            }
            if (g === undefined) {
                g = h.action.errFunc
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "addChild",
                    xpath: i,
                    parameters: k
                },
                respFunc: e,
                errFunc: g,
                options: h
            })
        },
        deleteElement: function(e, d, g, f) {
            if (!c.isFunction(d)) {
                f = d;
                d = undefined
            } else {
                if (!c.isFunction(g)) {
                    f = g;
                    g = undefined
                }
            }
            var h = c.extend(true, {}, this._options, f);
            if (d === undefined) {
                d = h.action.respFunc
            }
            if (g === undefined) {
                g = h.action.errFunc
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "deleteChild",
                    xpath: e
                },
                respFunc: d,
                errFunc: g,
                options: h
            })
        },
        onValueChange: function(i, j, g, h, l) {
            var d = this.actions.length;
            if (!c.isFunction(g)) {
                l = g;
                g = undefined
            } else {
                if (!c.isFunction(h)) {
                    l = h;
                    h = undefined
                }
            }
            var e = c.extend(true, {}, this._options, l);
            if (g === undefined) {
                g = e.action.respFunc
            }
            if (h === undefined) {
                h = e.action.errFunc
            }
            var k = this.client._events
              , f = String(this.client._eventId++);
            k[f] = {
                eventFunc: function(m) {
                    j.call(this, m.parameters.value, new b.Capability(m.parameters.capability), m.xpath)
                },
                options: e
            };
            this.actions.push({
                request: {
                    id: d,
                    method: "subscribeForNotification",
                    xpath: i,
                    parameters: {
                        id: f,
                        type: "value-change",
                        "current-value": e.currentValue
                    }
                },
                respFunc: g,
                errFunc: function(m, n) {
                    delete k[f];
                    h.call(this, m, n)
                },
                options: e
            });
            return f
        },
        onPeriodicValue: function(i, j, g, h, l) {
            var d = this.actions.length;
            if (!c.isFunction(g)) {
                l = g;
                g = undefined
            } else {
                if (!c.isFunction(h)) {
                    l = h;
                    h = undefined
                }
            }
            var e = c.extend(true, {}, this._options, l);
            if (g === undefined) {
                g = e.action.respFunc
            }
            if (h === undefined) {
                h = e.action.errFunc
            }
            var k = this.client._events
              , f = String(this.client._eventId++);
            k[f] = {
                id: f,
                eventFunc: function(m) {
                    j.call(this, m.parameters.value, new b.Capability(m.parameters.capability), m.xpath)
                },
                options: e
            };
            this.actions.push({
                request: {
                    id: d,
                    method: "subscribeForNotification",
                    xpath: i,
                    parameters: {
                        id: f,
                        type: "periodic",
                        timer: e.refreshTimer,
                        "current-value": e.currentValue
                    }
                },
                respFunc: g,
                errFunc: function(m, n) {
                    delete k[f];
                    h.call(this, m, n)
                },
                options: e
            });
            return f
        },
        onAddChild: function(i, j, g, h, l) {
            var d = this.actions.length;
            var e = c.extend(true, {}, this._options, l);
            if (g === undefined) {
                g = e.action.respFunc
            }
            if (h === undefined) {
                h = e.action.errFunc
            }
            var k = this.client._events
              , f = String(this.client._eventId++);
            k[f] = {
                eventFunc: function(n) {
                    var o = n.parameters.value;
                    if (a.isObject(o)) {
                        for (var m in o) {
                            if (o.hasOwnProperty(m)) {
                                o = o[m];
                                break
                            }
                        }
                    }
                    j.call(this, o, new b.Capability(n.parameters.capability), n.xpath)
                },
                options: e
            };
            this.actions.push({
                request: {
                    id: d,
                    method: "subscribeForNotification",
                    xpath: i,
                    parameters: {
                        id: f,
                        type: "add-child",
                        "current-value": e.notifyCurrentValue
                    }
                },
                respFunc: g,
                errFunc: function(m, n) {
                    delete k[f];
                    h.call(this, m, n)
                },
                options: e
            });
            return f
        },
        onDeleteChild: function(i, j, g, h, l) {
            var d = this.actions.length;
            var e = c.extend(true, {}, this._options, l);
            if (g === undefined) {
                g = e.action.respFunc
            }
            if (h === undefined) {
                h = e.action.errFunc
            }
            var k = this.client._events
              , f = String(this.client._eventId++);
            k[f] = {
                eventFunc: function(m) {
                    j.call(this, m.uid, m.xpath, m.type)
                },
                options: e
            };
            this.actions.push({
                request: {
                    id: d,
                    method: "subscribeForNotification",
                    xpath: i,
                    parameters: {
                        id: f,
                        type: "delete-child"
                    }
                },
                respFunc: g,
                errFunc: function(m, n) {
                    delete k[f];
                    h.call(this, m, n)
                },
                options: e
            });
            return f
        },
        deleteNotification: function(e, d, g, f) {
            var j = this.actions.length;
            var i = c.extend(true, {}, this._options, f);
            if (d === undefined) {
                d = i.action.respFunc
            }
            if (g === undefined) {
                g = i.action.errFunc
            }
            var h = this.client._events;
            this.actions.push({
                request: {
                    id: j,
                    method: "unsubscribeForNotification",
                    parameters: {
                        id: e
                    }
                },
                respFunc: function(k, l) {
                    delete h[e];
                    d.call(this, l)
                },
                errFunc: g,
                options: i
            })
        },
        getNotificationEvents: function(e, d) {
            var f = c.extend(true, {}, this._options, d);
            if (e === undefined) {
                e = f.action.errFunc
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "getEvents"
                },
                respFunc: f.action.respFunc,
                errFunc: e,
                options: f
            })
        },
        resetNotifications: function(e, d) {
            var f = c.extend(true, {}, this._options, d);
            if (e === undefined) {
                e = f.action.errFunc
            }
            this.actions.push({
                request: {
                    id: this.actions.length,
                    method: "resetEvents"
                },
                respFunc: f.action.respFunc,
                errFunc: e,
                options: f
            })
        }
    })
}(jQuery, jQuery.gui, jQuery.gui.api));
jQuery.extend(jQuery.gui, {
    XMO_REQUEST_NO_ERR: 16777216,
    XMO_REQUEST_PARAMETER_ERR: 16777217,
    XMO_REQUEST_FORMAT_ERR: 16777218,
    XMO_INVALID_SESSION_ERR: 16777219,
    XMO_SESSION_TIMEOUT_ERR: 16777220,
    XMO_SESSION_LOGOUT_ERR: 16777221,
    XMO_SERVER_DOWN_ERR: 16777222,
    XMO_AUTHENTICATION_ERR: 16777223,
    XMO_LOGIN_RETRY_ERR: 16777224,
    XMO_MAX_SESSION_COUNT_ERR: 16777225,
    XMO_ACCESS_RESTRICTION_ERR: 16777226,
    XMO_EXCLUSIVE_SESSION_ERR: 16777227,
    XMO_REMOTE_ADDRESS_ERR: 16777228,
    XMO_NO_ACTION_ERR: 16777229,
    XMO_ACTION_COUNT_ERR: 16777230,
    XMO_REQUEST_TIMEOUT_ERR: 16777231,
    XMO_REQUEST_COUNT_ERR: 16777232,
    XMO_REQUEST_ID_ERR: 16777233,
    XMO_PRIORITY_REQUEST_ERR: 16777234,
    XMO_RESET_EVENTS_ERR: 16777235,
    XMO_REQUEST_ACTION_ERR: 16777236,
    XMO_NEW_GETEVENTS_ERR: 16777237,
    XMO_NO_ERR: 16777238,
    XMO_APPLY_LATER_ERR: 16777239,
    XMO_FLUSH_GET_EVENTS_ERR: 16777240,
    XMO_INVALID_PATH_ERR: 16777241,
    XMO_UNKNOWN_PATH_ERR: 16777242,
    XMO_METHOD_ERR: 16777243,
    XMO_PARAMETER_ERR: 16777244,
    XMO_ACCESS_DENIED_ERR: 16777245,
    XMO_NOT_APPLIED_ERR: 16777246,
    XMO_OVERWRITED_ERR: 16777247,
    XMO_ACTION_CALLBACK_ERR: 16777248,
    XMO_CALLBACK_PARAMETERS_ERR: 16777249,
    XMO_VALUE_ERR: 16777250,
    XMO_DB_LOCKED_ERR: 16777251,
    XMO_NO_RESPONSE_ERR: 16777252,
    XMO_NOT_LIST_ERR: 16777253,
    XMO_NOT_LIST_ELEMENT_ERR: 16777254,
    XMO_MIN_LENGTH_ERR: 16777255,
    XMO_MAX_LENGTH_ERR: 16777256,
    XMO_MIN_VALUE_ERR: 16777257,
    XMO_MAX_VALUE_ERR: 16777258,
    XMO_ENUM_ERR: 16777259,
    XMO_REGEX_ERR: 16777260,
    XMO_ELEMENT_COUNT_ERR: 16777261,
    XMO_INVALID_FILE_ERR: 16777262,
    XMO_VOLATILE_ERR: 16777263,
    XMO_MIN_TIMER_ERR: 16777264,
    XMO_INTERNAL_ERR: 16777265,
    XMO_NEED_REBOOT_ERR: 16777266,
    XMO_UNLOCK_ERR: 16777267,
    XMO_CLEAR_ERR: 16777268,
    XMO_READ_FILE_ERR: 16777269,
    XMO_WRITE_FILE_ERR: 16777270,
    XMO_RESET_ERR: 16777271,
    XMO_REBOOTING_ERR: 16777272,
    XMO_REDO_PREPARECONF_ERR: 16777273,
    XMO_NO_DEVICE_ERR: 16777274,
    XMO_DEVICE_BUSY_ERR: 16777275,
    XMO_DUPLICATE_KEY_ERR: 16777276,
    XMO_DEVICE_PIN_ERR: 16777277,
    XMO_ADDRESS_ALREADY_USED_ERR: 16777278,
    XMO_UNAUTHORIZED_ADDRESS_ERR: 16777279,
    XMO_VOICE_TEST_NOT_SUPPORTED_ERR: 16777280,
    XMO_VOICE_TEST_PENDING_ERR: 16777281,
    XMO_VOICE_PAIRING_NOT_SUPPORTED_ERR: 16777282,
    XMO_VOICE_PAIRING_TIMEOUT_ERR: 16777283,
    XMO_VOICE_PAIRING_NBHANSETSET_REACHED_ERR: 16777284,
    XMO_VOICE_PAIRING_PENDING_ERR: 16777285,
    XMO_VOICE_UNPAIRING_NOT_SUPPORTED_ERR: 16777286,
    XMO_VOICE_UNPAIRING_PENDING_ERR: 16777287,
    XMO_VOICE_DECTRESET_NOT_SUPPORTED_ERR: 16777288,
    XMO_VOICE_DECTRESET_PENDING_ERR: 16777289,
    XMO_VOICE_INVALID_NUMBER_ERR: 16777290,
    XMO_OVERLAP_WPS_ERR: 16777291,
    XMO_TIMEOUT_WPS_ERR: 16777292,
    XMO_WPS_ERR: 16777293,
    XMO_MAX_LICENSE_ERR: 16777294,
    XMO_FXS_ALREADY_SET_ERR: 16777295,
    XMO_EXTENSION_NOT_EXIST_ERR: 16777296,
    XMO_EXTENSION_BUSY_ERR: 16777297,
    XMO_EXTENSION_DISCONNECTED_ERR: 16777298,
    XMO_HOST_NOT_FOUND_ERR: 16777299,
    XMO_NO_ROUTE_TO_HOST_ERR: 16777300,
    XMO_CONNECTION_TIMEOUT_ERR: 16777301,
    XMO_CONNECTION_REFUSED_ERR: 16777302,
    XMO_RESSOURCE_NOT_FOUND_ERR: 16777303,
    XMO_LICENSE_ERR: 16777304,
    XMO_TEST_ALREADY_RUNNING_ERR: 16777305,
    XMO_REQUEST_DENIED_ERR: 16777306,
    XMO_RESOURCES_EXCEEDED_ERR: 16777307,
    XMO_INVALID_PARAMETER_TYPE_ERR: 16777308,
    XMO_NON_WRITABLE_PARAMETER_ERR: 16777309,
    XMO_DOWNLOAD_ERR: 16777310,
    XMO_UPLOAD_ERR: 16777311,
    XMO_FILE_SERVER_AUTHENTIFICATION_ERR: 16777312,
    XMO_UNSUPPORTED_PROTOCOL_ERR: 16777313,
    XMO_JOIN_MULTICAST_GROUP_ERR: 16777314,
    XMO_CONTACT_FILE_SERVER_ERR: 16777315,
    XMO_FILE_ACCESS_ERR: 16777316,
    XMO_FILE_DOWNLOAD_ERR: 16777317,
    XMO_FILE_CORRUPTED_ERR: 16777318,
    XMO_LAST_ERR: 16777320
});
