function api_call(b, a, d) {
    b.open("POST", "/json");
    b.setRequestHeader("Content-Type", "application/json");
    b.withCredentials = true;
    b.onreadystatechange = d;
    b.send(JSON.stringify(a))
}

function api_response(b) {
    if (b.readyState == 4) {
        if (b.status == 200) {
            var a = JSON.parse(b.responseText);
            if (a.login != undefined) {
                top.location.href = login_url
            } else {
                return a
            }
        } else {
            alert("Server communication failed: " + b.status + " (" + b.responseText + ")");
            document.location = document.location + ""
        }
    }
    return false
}
var e = function(a) {
    return document.getElementById(a)
};

function Common() {
    this.goto_arena = function() {
        l("?s=Battle&ss=ar")
    };
    this.goto_ring = function() {
        l("?s=Battle&ss=rb")
    };
    this.goto_grindfest = function() {
        l("?s=Battle&ss=gr")
    };
    this.goto_itemworld = function() {
        l("?s=Battle&ss=iw")
    };
    var l = function(m) {
        document.location = MAIN_URL + m
    };
    this.findPos = function(n) {
        var o = 0;
        var m = 0;
        if (n.offsetParent) {
            do {
                o += n.offsetLeft;
                m += n.offsetTop
            } while (n = n.offsetParent)
        }
        return [o, m]
    };
    this.findPosWithScroll = function(n) {
        var o = 0;
        var m = 0;
        if (n.offsetParent) {
            do {
                o += n.offsetLeft + (n.scrollLeft ? n.scrollLeft : 0);
                m += n.offsetTop + (n.scrollTop ? n.scrollTop : 0)
            } while (n = n.offsetParent)
        }
        return [o, m]
    };
    this.findScrollOffset = function(n) {
        var o = 0;
        var m = 0;
        if (n.offsetParent) {
            do {
                o += n.scrollLeft ? n.scrollLeft : 0;
                m += n.scrollTop ? n.scrollTop : 0
            } while (n = n.offsetParent)
        }
        return [o, m]
    };
    this.getCursorPosition = function(n) {
        n = n || window.event;
        var o = {
            x: 0,
            y: 0
        };
        if (n.pageX || n.pageY) {
            o.x = n.pageX;
            o.y = n.pageY
        } else {
            var q = document.documentElement;
            var m = document.body;
            o.x = n.clientX + (q.scrollLeft || m.scrollLeft) - (q.clientLeft || 0);
            o.y = n.clientY + (q.scrollTop || m.scrollTop) - (q.clientTop || 0)
        }
        return o
    };
    this.decimalround = function(n, o) {
        var m = Math.round(n * Math.pow(10, o)) / Math.pow(10, o);
        return m
    };
    this.suppress_popups = false;
    this.show_popup_box = function(B, y, q, C, t, s, w, A, v, m) {
        if (this.suppress_popups) {
            return
        }
        var n = e("popup_box");
        var z = [0, 0];
        var o = [0, 0];
        var u = 0;
        if (s != undefined) {
            u = s.offsetWidth;
            z = common.findPosWithScroll(s);
            if (t != "") {
                var r = e(t);
                o[0] = r.scrollLeft;
                o[1] = r.scrollTop
            }
        }
        n.style.left = (w == "right" ? z[0] - o[0] + u + B : z[0] - o[0] - B - q) + "px";
        n.style.top = (z[1] - o[1] + y) + "px";
        n.style.width = q + "px";
        n.style.height = C + "px";
        n.innerHTML = "<div>" + A + "</div><div>" + v + "</div><div>" + m + "</div>";
        n.style.visibility = "visible"
    };
    this.hide_popup_box = function() {
        e("popup_box").removeAttribute("style")
    };
    this.show_itemc_box = function(n, r, o, m, s, q) {
        this.show_popup_box(n, r, 398, 75, o, m, s, dynjs_itemc[q].n, dynjs_itemc[q].q, "Consumable")
    };
    this.show_itemr_box = function(n, t, q, m, u, s, r, o) {
        this.show_popup_box(n, t, 398, 75, q, m, u, s, r, o)
    };
    var g = undefined;
    var b = 0;
    var h = 0;
    var d = 0;
    var a = function() {
        var m = g.scrollTop;
        g.scrollTop = b > 0 ? Math.min(g.scrollTop + d, h) : Math.max(g.scrollTop - d, h);
        if (m != g.scrollTop) {
            setTimeout(a, 1)
        } else {
            g = undefined;
            b = 0;
            h = 0
        }
    };
    this.scrollpane_up = function(o, n, m) {
        if (g == undefined) {
            g = e(o);
            b = -1;
            h = Math.max(0, g.scrollTop - n);
            d = m != undefined ? 1000 : 25;
            a()
        }
    };
    this.scrollpane_down = function(o, n, m) {
        if (g == undefined) {
            g = e(o);
            b = 1;
            h = g.scrollTop + n;
            d = m != undefined ? 1000 : 25;
            a()
        }
    };
    this.hookEvent = function(n, m, o) {
        if (typeof(n) == "string") {
            n = e(n)
        }
        if (n == null) {
            return
        }
        if (n.addEventListener) {
            if (m == "mousewheel") {
                n.addEventListener("DOMMouseScroll", o, false)
            }
            n.addEventListener(m, o, false)
        } else {
            if (n.attachEvent) {
                n.attachEvent("on" + m, o)
            }
        }
    };
    this.unhookEvent = function(n, m, o) {
        if (typeof(n) == "string") {
            n = e(n)
        }
        if (n == null) {
            return
        }
        if (n.removeEventListener) {
            if (m == "mousewheel") {
                n.removeEventListener("DOMMouseScroll", o, false)
            }
            n.removeEventListener(m, o, false)
        } else {
            if (n.detachEvent) {
                n.detachEvent("on" + m, o)
            }
        }
    };
    this.cancelEvent = function(m) {
        m = m ? m : window.event;
        if (m.stopPropagation) {
            m.stopPropagation()
        }
        if (m.preventDefault) {
            m.preventDefault()
        }
        m.cancelBubble = true;
        m.cancel = true;
        m.returnValue = false;
        return false
    };
    this.number_format = function(n) {
        n += "";
        x = n.split(".");
        x1 = x[0];
        x2 = x.length > 1 ? "." + x[1] : "";
        var m = /(\d+)(\d{3})/;
        while (m.test(x1)) {
            x1 = x1.replace(m, "$1,$2")
        }
        return x1 + x2
    };
    var j = [9, 5, 10, 10, 10, 10, 10, 10, 9, 9, 4, 4, 5, 10, 11, 8, 8, 8, 11, 11, 4, 4, 4];
    this.get_dynamic_digit_string = function(n) {
        var r = this.number_format(n);
        var m = "";
        var q = 0;
        for (var o = r.length - 1; o >= 0; o--) {
            var s = 0;
            if (r.charAt(o) == ",") {
                s = 11
            } else {
                if (r.charAt(o) == ".") {
                    s = 10
                } else {
                    if (r.charAt(o) == "+") {
                        s = 15
                    } else {
                        if (r.charAt(o) == ":") {
                            s = 22
                        } else {
                            if (r.charAt(o) == "-") {
                                s = 16
                            } else {
                                s = parseInt(r.charAt(o))
                            }
                        }
                    }
                }
            }
            m = m + '<div style="float:right; height:12px; width:' + (j[s] + 1) + "px; background:transparent url(" + IMG_URL + "font/12b.png) 0px -" + (s * 12) + 'px"></div>';
            q += j[s]
        }
        return '<div style="position:relative; display:inline; height:12px; width:' + q + 'px">' + m + "</div>"
    };

    function f(m, u, v) {
        var q = m.getElementsByTagName("DIV");
        var s = new Array("f2l" + u, "f2r" + u, "f4l" + u, "f4r" + u);
        var t = new Array("f2l" + v, "f2r" + v, "f4l" + v, "f4r" + v);
        var n = v == "a" ? "#0030CB" : "#5C0D11";
        for (var r = 0; r < q.length; r++) {
            for (var o = 0; o < s.length; o++) {
                q[r].className = q[r].className.replace(s[o], t[o]);
                q[r].style.color = n
            }
        }
    }
    this.apply_select = function(m) {
        f(m, "b", "a");
        m.style.color = "#0030CB"
    };
    this.apply_unselect = function(m) {
        f(m, "a", "b");
        m.removeAttribute("style")
    };
    var k = undefined;
    this.text_select = function(m) {
        var n = k != m;
        this.text_unselect();
        if (n) {
            this.apply_select(m);
            k = m
        }
    };
    this.text_unselect = function() {
        if (k != undefined) {
            this.apply_unselect(k);
            k = undefined
        }
    }
}
var common = new Common();

function Itembot() {
    this.set_item = function(b) {
        var d = e("bot_item");
        selected_item = b;
        for (var a = 0; a < d.options.length; a++) {
            if (d.options[a].value == b) {
                d.selectedIndex = a;
                break
            }
        }
        this.update_botpane()
    };
    this.update_botpane = function() {
        var a = e("bot_item").value;
        e("bot_maxcount").value = biddata[a].cc;
        e("bot_maxprice").value = biddata[a].cb;
        e("minprice").innerHTML = common.get_dynamic_digit_string(biddata[a].mb);
        e("highbid").innerHTML = common.get_dynamic_digit_string(biddata[a].hb);
        common.text_unselect()
    };
    this.modify_task = function() {
        e("itembot_form").submit()
    }
}

function EquipShop() {
    var b = undefined;
    var g = 0;
    var f = 0;
    var a = e("sum_field");
    var h = e("accept_button");
    var d = new MultiSelector(false, true);
    this.set_equip = function(l, k, n) {
        var j = d.select(l, k, n);
        b = j.group;
        if (j.reset) {
            g = 0
        }
        var m = eqvalue[l.id.replace(/^e/, "")];
        if (j.selected == 1) {
            g += m
        } else {
            if (j.selected == -1) {
                g -= m
            }
        }
        f = j.count;
        a.innerHTML = common.get_dynamic_digit_string(g);
        if ((j.count > 0) && ((b != "shop_pane") || (g <= current_credits))) {
            h.style.cursor = "pointer";
            h.onclick = this.commit_transaction;
            h.src = IMG_URL + "shops/accept.png"
        } else {
            if (h.onclick) {
                h.removeAttribute("style");
                h.removeAttribute("onclick");
                h.src = IMG_URL + "shops/accept_d.png"
            }
        }
    };
    this.select_all = function(l) {
        var k = {
            shiftKey: true,
            ctrlKey: true
        };
        for (i in rangeselect[l]) {
            var j = rangeselect[l][i];
            this.set_equip(e("e" + j), k, l, eqvalue[j])
        }
    };
    this.commit_transaction = function() {
        if (confirm("Are you sure you wish to " + (b == "shop_pane" ? "purchase" : "sell") + " " + f + " equipment piece" + (f > 1 ? "s" : "") + " for " + common.number_format(g) + " credits?")) {
            d.populate_list("select_eids");
            e("select_group").value = b;
            e("shopform").submit()
        }
    }
}

function ItemShop() {
    var k = undefined;
    var g = 0;
    var j = 0;
    var f = undefined;
    var b = 0;
    var h = 0;
    var d = false;
    this.set_item = function(q, n, l, o, m) {
        if ((n == g) && (q == k)) {
            q = undefined;
            n = 0;
            l = 0;
            o = 0;
            m = undefined
        }
        k = q;
        g = n;
        b = o;
        f = n && !m ? dynjs_itemc[n].n : m;
        h = l;
        this.set_count(n > 0 ? 1 : 0);
        a()
    };
    this.set_count = function(l) {
        j = Math.max(0, Math.min(l, h));
        e("count_field").value = j;
        a()
    };
    this.increase_count = function(l) {
        this.set_count(j == 1 && l > 1 ? l : j + l)
    };
    this.read_count = function() {
        j = Math.max(0, parseInt(e("count_field").value));
        if (g > 0) {
            if (j > h) {
                this.set_count(h)
            }
        }
        a()
    };

    function a() {
        d = true;
        if (g < 1 || j < 1) {
            d = false
        } else {
            if (k == "shop_pane") {
                if (j * b > current_credits) {
                    d = false
                }
            }
        }
        e("accept_button").src = IMG_URL + "shops/accept" + (d ? "" : "_d") + ".png";
        e("cost_field").value = b;
        e("sum_field").value = (j * b).toLocaleString("en")
    }
    this.commit_transaction = function() {
        if (d) {
            if (confirm("Are you sure you wish to " + (k == "shop_pane" ? "purchase" : "sell") + " " + j + ' "' + f.replace("&#039;", "'") + '" for ' + common.number_format(j * b) + " credits ?")) {
                e("select_mode").value = k;
                e("select_item").value = g;
                e("select_count").value = j;
                e("shopform").submit()
            }
        }
    }
}

function Forge(g) {
    var f = 0;
    var a = false;
    this.set_forge_equip = function(j, h) {
        if (g || j.getAttribute("data-locked") != "1") {
            common.text_select(j);
            if (h == f) {
                h = 0
            }
            f = h;
            d()
        }
    };
    var b = 0;
    this.set_forge_cost = function(j, k) {
        var h = e("forge_cost_div");
        if (j == b) {
            h.innerHTML = typeof default_forge_cost_text !== "undefined" ? default_forge_cost_text : "";
            b = 0
        } else {
            h.innerHTML = k;
            b = j
        }
    };

    function d() {
        a = true;
        if (f < 1) {
            a = false
        } else {
            a = true
        }
        var m = e("upgrade_button");
        var l = e("enchant_button");
        var k = e("salvage_button");
        var h = e("reforge_button");
        var n = e("repair_button");
        var j = e("soulfuse_button");
        if (m != undefined) {
            m.src = IMG_URL + "shops/showupgrades" + (a ? "" : "_d") + ".png"
        }
        if (l != undefined) {
            l.src = IMG_URL + "shops/showenchants" + (a ? "" : "_d") + ".png"
        }
        if (k != undefined) {
            k.src = IMG_URL + "shops/salvage" + (a ? "" : "_d") + ".png"
        }
        if (h != undefined) {
            h.src = IMG_URL + "shops/reforge" + (a ? "" : "_d") + ".png"
        }
        if (n != undefined) {
            n.src = IMG_URL + "shops/repair" + (a ? "" : "_d") + ".png"
        }
        if (j != undefined) {
            j.src = IMG_URL + "shops/soulfuse" + (a ? "" : "_d") + ".png"
        }
    }
    this.commit_transaction = function() {
        if (a) {
            e("select_item").value = f;
            e("shopform").submit()
        } else {
            alert("No item selected")
        }
    }
}

function Snowflake() {
    var k = e("shrine_info");
    var f = e("shrine_artifact");
    var m = e("shrine_trophy");
    var b = e("shrine_collectible");
    var a = 0;
    var g = 0;
    var d = undefined;
    var h = false;
    var l = ["1handed", "2handed", "staff", "shield", "acloth", "alight", "aheavy"];
    this.set_shrine_item = function(o, n) {
        if (o == a) {
            o = 0;
            n = undefined
        }
        a = o;
        d = n;
        j()
    };
    this.set_shrine_reward = function(q, n) {
        if (q == g) {
            q = 0
        }
        g = q;
        for (var o = 1; o <= 7; o++) {
            e("reward_" + o).src = IMG_URL + "shops/" + l[o - 1] + (o == q ? "_on" : "_off") + ".png"
        }
        j()
    };

    function j() {
        h = true;
        var n = 0;
        if (a < 1) {
            h = false;
            n = 1
        } else {
            if (a >= 20000 && a < 30000) {
                h = true;
                n = 2
            } else {
                if (a >= 30000 && a < 40000) {
                    h = g > 0;
                    n = 3
                } else {
                    if (a >= 70000 && a < 80000) {
                        h = true;
                        n = 4
                    }
                }
            }
        }
        k.style.display = n == 1 ? "" : "none";
        f.style.display = n == 2 ? "" : "none";
        m.style.display = n == 3 ? "" : "none";
        b.style.display = n == 4 ? "" : "none";
        e("accept_button").src = IMG_URL + "shops/offering" + (h ? "" : "_d") + ".png"
    }
    this.commit_transaction = function() {
        if (h) {
            if (confirm('Are you sure you wish to offer Snowflake a "' + d.replace("&#039;", "'") + '" ?')) {
                e("select_item").value = a;
                e("select_reward").value = g;
                e("shopform").submit()
            }
        }
    }
}

function MoogleMail() {
    var b = 0;
    var a = undefined;
    this.set_mooglemail_item = function(f, d) {
        if (d != undefined) {
            if (d.getAttribute("data-locked") == "1") {
                return
            }
        }
        if (f == b) {
            f = 0
        }
        if (f == 0) {
            common.text_unselect();
            b = 0
        } else {
            if (d != undefined) {
                common.text_select(d)
            }
            b = f;
            if (a == "equip") {
                this.apply_attachment()
            }
        }
    };
    this.set_mooglemail_pane = function(d) {
        this.set_mooglemail_item(0);
        a = a == d ? undefined : d;
        e("mmail_attachinfo").style.display = a == undefined ? "" : "none";
        e("mmail_attachitem").style.display = a == "item" ? "" : "none";
        e("mmail_attachequip").style.display = a == "equip" ? "" : "none";
        e("mmail_attachcredits").style.display = a == "credits" ? "" : "none";
        e("mmail_attachhath").style.display = a == "hath" ? "" : "none"
    };
    this.apply_attachment = function() {
        if (a != undefined) {
            var d = a == "equip" ? 1 : Math.max(1, parseInt(e("count_" + a).value));
            if (d > 0) {
                e("action").value = "attach_add";
                e("select_item").value = b;
                e("select_count").value = d;
                e("select_pane").value = a;
                e("mailform").submit()
            }
        }
    };
    this.check_apply_attachment = function(d) {
        if (d.keyCode == 13) {
            this.apply_attachment()
        }
    };
    this.mmail_send = function() {
        var d = "";
        if (attach_count > 0) {
            d = "You have attached " + attach_count + (attach_count == 1 ? " item" : " items") + (attach_cod > 0 ? ", and the CoD is set to " + attach_cod + " credits, kupo!" : ", but you have not set a CoD, kupo! The attachments will be a gift, kupo!")
        }
        if (send_cost > 0) {
            d += " Sending it will cost you " + send_cost + " credits, kupo!"
        }
        if (confirm(d + " Are you sure you wish to send this message, kupo?")) {
            e("action").value = "send";
            e("mailform").submit()
        }
    };
    this.mmail_save = function() {
        e("action").value = "save";
        e("mailform").submit()
    };
    this.mmail_discard = function() {
        if (confirm("Are you sure you wish to discard this message, kupo?")) {
            e("action").value = "discard";
            e("mailform").submit()
        }
    };
    this.remove_attachment = function(d) {
        if (mail_state > 0 && attach_cod > 0) {
            if (!confirm("Removing the attachments will deduct " + attach_cod + " Credits from your account, kupo! Are you sure?")) {
                return
            }
        }
        e("action").value = "attach_remove";
        e("action_value").value = d;
        e("mailform").submit()
    };
    this.return_mail = function() {
        if (confirm("This will return the message to the sender, kupo! Are you sure?")) {
            e("action").value = "return_message";
            e("mailform").submit()
        }
    };
    this.check_set_cod = function(d) {
        if (d.keyCode == 13) {
            this.set_cod()
        }
    };
    this.set_cod = function() {
        e("action").value = "attach_cod";
        e("action_value").value = Math.max(0, parseInt(e("newcod").value));
        e("mailform").submit()
    }
}

function Equips() {
    var a = 0;
    var b = undefined;
    this.set = function(f, g, d, j) {
        var h = (typeof dynjs_eqstore == "undefined") || (typeof dynjs_eqstore[f] == "undefined") ? dynjs_equip : dynjs_eqstore;
        a = f;
        b = h[f].k;
        common.show_popup_box(d, j, 360, 320, g, undefined, "right", h[f].t, h[f].d, "")
    };
    this.unset = function() {
        a = 0;
        b = undefined;
        common.hide_popup_box()
    };
    this.pop_equipwindow = function() {
        if (a > 0) {
            var f = MAIN_URL + "equip/" + a + "/" + b;
            var d = 450;
            var g = 520;
            window.open(f, "_pu" + (Math.random() + "").replace(/0\./, ""), "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=" + d + ",height=" + g + ",left=" + ((screen.width - d) / 2) + ",top=" + ((screen.height - g) / 2));
            return true
        }
        return false
    };
    this.lock = function(f, h) {
        var d = new XMLHttpRequest();
        var g = {
            type: "simple",
            method: "lockequip",
            uid: uid,
            token: simple_token,
            eid: f,
            lock: h.className == "il" ? 0 : 1
        };
        api_call(d, g, function() {
            var k = api_response(d);
            if (k != false) {
                if (k.eid != undefined) {
                    h.className = k.locked ? "il" : "iu";
                    var l = e("e" + f);
                    var j = l.getAttribute("data-locked");
                    if (j) {
                        if (j === "0" && l.getAttribute("style") && l.onclick) {
                            l.onclick()
                        }
                        l.setAttribute("data-locked", k.locked)
                    }
                }
            }
        })
    };
    document.onkeypress = function(f) {
        if (f.shiftKey || f.altKey) {
            return
        }
        var d = (window.event) ? f.keyCode : f.which;
        var g = String.fromCharCode(d);
        if (g == "c") {
            if (equips.pop_equipwindow()) {
                common.cancelEvent(f)
            }
        }
    }
}

function MultiSelector(j, d) {
    var g = undefined;
    var f = {};
    var b = 0;
    var h = false;
    var a = undefined;
    this.select = function(l, k, s) {
        var t = l.id.replace(/^e/, "");
        var r = 0;
        var n = false;
        if (j || l.getAttribute("data-locked") != "1") {
            r = 1;
            if (!h && (!k || !k.shiftKey)) {
                if (this.unselect(t)) {
                    r = -1
                }
            }
            if (r == 1) {
                if (s != undefined) {
                    if (s != g) {
                        n = true
                    } else {
                        if (d && k && !h && !k.shiftKey && !k.ctrlKey) {
                            n = true
                        }
                    }
                }
                if (n) {
                    this.unselect_all()
                }
                g = s;
                if (!h && k && k.shiftKey && (a != undefined) && (s != undefined) && (a != t) && (typeof rangeselect != "undefined")) {
                    var m = false;
                    h = true;
                    for (i in rangeselect[s]) {
                        var o = rangeselect[s][i];
                        if (o == t || o == a) {
                            m = !m
                        } else {
                            if (m) {
                                var q = e("e" + o);
                                if (q) {
                                    if (q.onclick) {
                                        q.onclick()
                                    }
                                }
                            }
                        }
                    }
                    h = false
                }
                if (typeof f[t] == "undefined") {
                    f[t] = l;
                    common.apply_select(l);
                    ++b
                } else {
                    r = 0
                }
            }
            if (!h) {
                a = t
            }
        }
        return {
            key: t,
            selected: r,
            group: g,
            count: b,
            reset: n
        }
    };
    this.unselect = function(k) {
        if (typeof f[k] != "undefined") {
            --b;
            common.apply_unselect(f[k]);
            delete f[k];
            return true
        }
        return false
    };
    this.unselect_all = function() {
        var l = Object.keys(f);
        for (var k in l) {
            this.unselect(l[k])
        }
        g = undefined;
        a = undefined;
        b = 0
    };
    this.populate_list = function(k, l) {
        if (l == undefined) {
            l = ","
        }
        e(k).value = Object.keys(f).join(l)
    };
    this.populate_group = function(k) {
        e(k).value = g
    }
}

function Training() {
    this.start_training = function(f) {
        e("start_train").value = f;
        e("trainform").submit()
    };
    this.cancel_training = function() {
        e("cancel_train").value = 1;
        e("trainform").submit()
    };
    var b = e("train_progbar");
    var a = e("train_progcnt");
    if (typeof reload_to != "undefined") {
        var d = setInterval(function() {
            var j = (Date.now() / 1000) + time_skew;
            var f = j < end_time ? f = 100 - ((end_time - j) * 100 / total_time) : 100;
            var g = Math.floor(f);
            var h = Math.floor((f - g) * 100);
            a.innerHTML = g + "." + (h < 10 ? "0" : "") + h;
            b.style.width = (f * 4) + "px";
            if (j >= end_time) {
                document.location = reload_to;
                clearInterval(d)
            }
        }, ticktime)
    }
}

function ItemSelector() {
    var a = 0;
    var d = false;
    this.set_item = function(g) {
        if (a == g) {
            this.commit_slot(0)
        } else {
            a = g
        }
    };
    var f = undefined;
    var b = undefined;
    this.hover_slot = function(g) {
        if (a == 0) {
            return
        }
        if (f != undefined) {
            this.unhover_slot()
        }
        common.suppress_popups = true;
        f = g;
        b = g.innerHTML;
        g.innerHTML = dynjs_itemc[a].n;
        g.className = "ss"
    };
    this.unhover_slot = function() {
        if (f != undefined) {
            f.innerHTML = b;
            f.removeAttribute("class");
            f = undefined;
            common.suppress_popups = false
        }
    };
    this.commit_slot = function(g) {
        if (!d) {
            d = true;
            e("slot").value = g;
            e("item").value = a;
            e("selectionform").submit()
        }
    }
}

function MonsterLab() {
    this.create_monster = function(a) {
        e("selected_patk").value = a;
        e("create_form").submit()
    }
}

function Battle() {
    var E = e("infopane");
    var g = new Array(undefined, undefined);
    var j = new Array(undefined, undefined);
    var s = "log";
    var b = "log";
    var z = undefined;
    var l = undefined;
    var d = undefined;
    var h = 1;
    var H = 0;
    var v = undefined;
    var B = e("ta_monster_1");
    var A = e("ta_monster_2");
    var o = false;
    var f = function(J) {
        if (E != undefined) {
            E.innerHTML = J
        }
    };
    this.set_infopane = function(K) {
        var J = undefined;
        switch (K) {
            case "Attack":
                J = "Damages a single enemy. Depending on your equipped weapon, this can place certain status effects on the affected monster. To attack, click here, then click your target. Simply clicking an enemy will also perform a normal attack.";
                break;
            case "Skillbook":
                J = "Use special skills and magic. To use offensive spells and skills, first click it, then click your target. To use it on yourself, click it twice.";
                break;
            case "Items":
                J = "Use various consumable items that can replenish your vitals or augment your power in various ways.";
                break;
            case "Spirit":
                J = "Toggle Spirit Channeling.";
                break;
            case "Defend":
                J = "Increases your defensive capabilities for the next turn.";
                break;
            case "Focus":
                J = "Reduces the chance that your next spell will be resisted. Your defenses and evade chances are lowered for the next turn.";
                break;
            default:
                J = "Choose from the Battle Actions highlighted above, and use them to defeat your enemies listed to the right. When all enemies are reduced to zero Health, you win. If your Health reaches zero, you are defeated.";
                break
        }
        f('<div class="btii">' + K + "</div><div>" + J + "</div>")
    };
    this.set_infopane_spell = function(P, O, N, K, L, J) {
        var M = "";
        if (K > 0 || L > 0) {
            M = "Requires ";
            if (K > 0) {
                M += K + " Magic Points"
            }
            if (K > 0 && L > 0) {
                M += K + " and "
            }
            if (L > 0) {
                M += L + " Charge" + (L == 1 ? "" : "s")
            }
            M += " to use."
        }
        if (J > 0) {
            M += " Cooldown: " + J + " turns."
        }
        f('<div class="btii">' + P + '</div><div style="position:relative"><div style="float:left; width:601px"><div style="padding-bottom:3px; padding-right:3px">' + O + '</div><div><span style="font-weight:bold">' + M + '</span></div></div><div style="float:left; width:32px; height:32px; position:relative"><img src="' + IMG_URL + "a/" + N + '.png" style="border:0px; margin:0px; padding:0px; position:absolute; left:3px; top:4px; z-index:3" /><img src="' + IMG_URL + 'ab/b.png" style="border:0px; margin:0px; padding:0px; position:absolute; left:-5px; top:-4px; z-index:3" /></div></div>')
    };
    this.set_infopane_effect = function(M, L, J) {
        var K = undefined;
        if (J == "autocast") {
            K = "Expires if magic is depleted to below 10%"
        } else {
            if (J == "permanent") {
                K = "Permanent until triggered"
            } else {
                K = "Expires in " + J + " turn" + (J == 1 ? "" : "s")
            }
        }
        f('<div class="btii">' + M + '</div><div style="padding-bottom:3px">' + L + '</div><div><span style="font-weight:bold">' + K + ".</span></div>")
    };
    this.set_infopane_item = function(J) {
        f('<div class="btii">' + dynjs_itemc[J].n + '</div><div style="padding-bottom:3px">' + dynjs_itemc[J].q + "</div>")
    };
    this.lock_action = function(K, M, L, J) {
        if (o) {
            return
        }
        if ((j[M] == K) && (L != "skill")) {
            g[M] = undefined;
            j[M] = undefined
        } else {
            g[M] = E.innerHTML;
            j[M] = K
        }
        if (M == 0) {
            g[1] = undefined;
            j[1] = undefined
        }
        if (M == 1) {
            if (z != L) {
                this.clear_actions();
                z = L;
                K.src = IMG_URL + "battle/" + z + "_s.png";
                this.set_mode(L)
            }
            this.set_selected_subaction(K, J)
        } else {
            if (z == L) {
                if (L == "skill") {
                    this.set_selected_subaction(undefined)
                } else {
                    z = undefined
                }
            } else {
                this.clear_actions();
                z = L
            }
            K.src = IMG_URL + "battle/" + L + "_" + (z == undefined ? "n" : "s") + ".png";
            this.set_mode(L);
            switch (L) {
                case "attack":
                    this.toggle_default_pane();
                    break;
                case "skill":
                    this.toggle_magic_pane();
                    break;
                case "items":
                    this.toggle_item_pane();
                    break;
                default:
                    this.touch_and_go()
            }
        }
    };
    this.clear_actions = function() {
        if (z != undefined) {
            if (z != "spirit") {
                var J = z == "magic" ? "skill" : z;
                e("ckey_" + J).src = IMG_URL + "battle/" + J + "_n.png"
            }
            z = undefined
        }
    };
    this.clear_infopane = function() {
        if (g[1] != undefined) {
            f(g[1])
        } else {
            if (g[0] != undefined) {
                f(g[0])
            } else {
                this.set_infopane("Battle Time")
            }
        }
    };
    var r = function(J) {
        e("pane_" + J).style.display = "";
        s = J
    };
    var w = function(J) {
        e("pane_" + J).style.display = "none";
        s = undefined
    };
    this.toggle_pane = function(J) {
        if (J == s) {
            this.toggle_default_pane()
        } else {
            w(s);
            r(J)
        }
    };
    this.toggle_default_pane = function() {
        if (s != b) {
            w(s);
            r(b);
            s = b
        }
    };
    this.toggle_magic_pane = function() {
        if (s == "skill") {
            this.toggle_pane("magic")
        } else {
            if (s == "magic") {
                this.toggle_pane("skill")
            } else {
                this.toggle_pane(default_magic_pane)
            }
        }
    };
    this.toggle_skill_pane = function() {
        this.toggle_pane("skill")
    };
    this.toggle_item_pane = function() {
        this.toggle_pane("item")
    };
    var u = "attack";
    var G = 0;
    var q = 0;
    this.set_mode = function(J) {
        if (u == J && J != "magic") {
            u = "attack"
        } else {
            u = J
        }
    };
    this.reset_skill = function() {
        G = 0;
        q = 0;
        this.set_selected_subaction(undefined)
    };
    this.set_hostile_skill = function(J) {
        if (q == J) {
            q = 0
        } else {
            q = J
        }
    };
    this.set_friendly_skill = function(J) {
        if (q == J) {
            G = 0;
            this.touch_and_go()
        } else {
            q = J
        }
    };
    this.hover_target = function(K) {
        if (d != undefined) {
            return
        }
        var L = common.findPosWithScroll(K);
        var J = common.findPosWithScroll(e("battle_right"));
        L[0] -= J[0];
        L[1] -= J[1];
        B.style.left = (L[0] - 7) + "px";
        B.style.top = (L[1] + K.offsetHeight / 2 - 3) + "px";
        A.style.left = (L[0] + K.offsetWidth + 2) + "px";
        A.style.top = (L[1] + K.offsetHeight / 2 - 3) + "px";
        B.style.visibility = "visible";
        A.style.visibility = "visible"
    };
    this.unhover_target = function() {
        if (d != undefined) {
            return
        }
        B.removeAttribute("style");
        A.removeAttribute("style")
    };
    this.commit_target = function(J) {
        if (o) {
            return
        }
        if (d != undefined) {
            return
        }
        d = J;
        G = J;
        this.touch_and_go()
    };
    var m = undefined;
    var t = undefined;
    var D = undefined;
    this.touch_and_go = function() {
        if (o) {
            return
        }
        if (v == undefined) {
            m = u;
            t = G;
            D = q;
            v = new XMLHttpRequest();
            var J = {
                type: "battle",
                method: "action",
                token: battle_token,
                mode: u,
                target: G,
                skill: q
            };
            api_call(v, J, this.process_action)
        }
    };
    this.recast = function() {
        if (o) {
            return
        }
        if (m != undefined) {
            u = m;
            G = t;
            q = D;
            this.touch_and_go()
        }
    };
    var F = 0;
    var n = false;
    var y = ["pane_completion", "pane_effects", "pane_action", "pane_vitals", "pane_quickbar", "table_skills", "table_magic", "pane_item", "pane_monster"];
    var a = [];
    for (var C = 0; C < y.length; C++) {
        var I = y[C];
        a[I] = e(I)
    }
    this.process_action = function() {
        var R = api_response(v);
        if (R != false) {
            if (R.error != undefined) {
                this.battle_continue()
            } else {
                if (R.reload != undefined) {
                    this.battle_continue()
                } else {
                    for (var M = 0; M < y.length; M++) {
                        var P = y[M];
                        if (R[P] != undefined) {
                            a[P].innerHTML = R[P]
                        }
                    }
                    if (has_debug) {
                        e("debugpane").innerHTML = R.debugpane
                    }
                    if (R.textlog != undefined) {
                        var L = e("textlog");
                        var O = L.insertRow(0);
                        var N = O.insertCell(0);
                        N.className = "tls";
                        var K = R.textlog.length;
                        for (var M = 0; M < K; M++) {
                            var Q = L.insertRow(0);
                            var J = Q.insertCell(0);
                            J.className = "tl" + (R.textlog[M].c != undefined ? R.textlog[M].c : "");
                            J.innerHTML = R.textlog[M].t
                        }
                        F += K;
                        while (F > 100) {
                            L.deleteRow(-1);
                            --F
                        }
                    }
                    if (R.pane_completion == undefined) {
                        e("pane_completion").innerHTML = "";
                        o = false
                    } else {
                        o = true
                    }
                    e("expbar").style.width = R.exp + "px";
                    if (R.exp == 1234) {
                        n = true;
                        e("expbar").src = IMG_URL + "bar_yellow.png"
                    } else {
                        if (n) {
                            n = false;
                            e("expbar").src = IMG_URL + "bar_blue.png"
                        }
                    }
                    do_healthflash = R.healthflash;
                    d = undefined;
                    battle.unhover_target();
                    battle.reset_skill();
                    battle.set_mode("attack");
                    H = 1;
                    B.style.opacity = H;
                    A.style.opacity = H;
                    battle.toggle_default_pane();
                    g[0] = undefined;
                    g[1] = undefined;
                    battle.clear_infopane();
                    battle.clear_actions()
                }
            }
            v = undefined
        }
    };
    this.battle_continue = function() {
        document.location = document.location + ""
    };
    this.set_selected_subaction = function(J, K) {
        if (J == undefined) {
            l = undefined;
            common.text_unselect();
            return
        }
        if (l == K) {
            this.set_selected_subaction(undefined)
        } else {
            common.text_select(J)
        }
    };
    var k = 0;
    this.start_flash_loop = function() {
        setInterval(function() {
            H = common.decimalround(Math.min(1, Math.max(0, H + 0.07 * h)), 2);
            if (H == 0 || H == 1) {
                h *= -1
            }
            if (d != undefined) {
                B.style.opacity = H;
                A.style.opacity = H
            }
            if (do_healthflash) {
                k = Math.floor(80 + H * 150);
                e(vital_prefix + "vbh").style.backgroundColor = "rgb(" + k + ",50,50)"
            } else {
                if (k != 0) {
                    e(vital_prefix + "vbh").style.backgroundColor = "";
                    k = 0
                }
            }
            var K = 0;
            var J = undefined;
            while (J = e("effect_expire_" + ++K)) {
                J.style.opacity = (0.8 - H / 2)
            }
        }, 20)
    };
    document.onkeydown = function(K) {
        K = K || window.event;
        var O;
        if (K.target) {
            O = K.target
        } else {
            if (K.srcElement) {
                O = K.srcElement
            }
        }
        if (O.nodeType == 3) {
            O = O.parentNode
        }
        if (O.tagName == "INPUT" || O.tagName == "TEXTAREA") {
            return
        }
        var R = (K.keyCode) ? K.keyCode : K.which;
        var Q = String.fromCharCode(R);
        var J = undefined;
        var P = undefined;
        var M = undefined;
        var N = -1;
        switch (R) {
            case 48:
            case 96:
                N = 0;
                break;
            case 49:
            case 97:
                N = 1;
                break;
            case 50:
            case 98:
                N = 2;
                break;
            case 51:
            case 99:
                N = 3;
                break;
            case 52:
            case 100:
                N = 4;
                break;
            case 53:
            case 101:
                N = 5;
                break;
            case 54:
            case 102:
                N = 6;
                break;
            case 55:
            case 103:
                N = 7;
                break;
            case 56:
            case 104:
                N = 8;
                break;
            case 57:
            case 105:
                N = 9;
                break
        }
        var S = false;
        if (K.altKey) {
            if (N >= 0 && N < 10) {
                if (N == 0) {
                    N = 10
                }
                S = true;
                var L = e("qb" + N);
                if (L) {
                    L.onmouseover();
                    L.onclick()
                }
            }
        } else {
            if (R == 13 || R == 32) {
                J = "btcp"
            } else {
                if (N > -1) {
                    J = "mkey_" + N
                } else {
                    if ((R >= 112 && R <= 123) || Q == "G" || Q == "P") {
                        if (s != "item") {
                            J = "ckey_items"
                        }
                        if (Q == "G" || Q == "P") {
                            P = "ikey_p"
                        } else {
                            if (K.ctrlKey) {
                                P = "ikey_n" + (R - 111)
                            } else {
                                if (K.shiftKey) {
                                    P = "ikey_s" + (R - 111)
                                } else {
                                    P = "ikey_" + (R - 111)
                                }
                            }
                        }
                    } else {
                        if (!K.ctrlKey && !K.shiftKey) {
                            switch (Q) {
                                case "Q":
                                    J = "ckey_attack";
                                    break;
                                case "W":
                                    J = "ckey_skill";
                                    break;
                                case "E":
                                    J = "ckey_items";
                                    break;
                                case "S":
                                    J = "ckey_spirit";
                                    break;
                                case "D":
                                    J = "ckey_defend";
                                    break;
                                case "F":
                                    J = "ckey_focus";
                                    break;
                                case "R":
                                    J = "recast";
                                    break
                            }
                        }
                    }
                }
            }
            if (J || P) {
                S = true
            }
            if (J) {
                if (J == "recast") {
                    battle.recast()
                } else {
                    if (L = e(J)) {
                        L.onclick()
                    }
                }
            }
            if (P) {
                if (L = e(P)) {
                    L.onclick()
                }
            }
        }
        if (S) {
            K.cancelBubble = true;
            K.returnValue = false;
            if (K.stopPropagation) {
                K.stopPropagation();
                K.preventDefault()
            }
            return false
        }
    };
    this.clear_infopane();
    this.start_flash_loop();
    this.set_infopane("Battle Time")
}

function at_show_aux(a, h) {
    var f = e(a);
    var g = e(h);
    var d = 27;
    var b = (g.at_position == "x") ? f.offsetWidth + 0 : 0;
    for (; f; f = f.offsetParent) {
        b += f.offsetLeft
    }
    g.style.position = "absolute";
    g.style.top = d + "px";
    g.style.left = b + "px";
    g.style.visibility = "visible"
}

function at_show() {
    p = e(this["at_parent"]);
    c = e(this["at_child"]);
    at_show_aux(p.id, c.id)
}

function at_hide() {
    c = e(this["at_child"]);
    e(c.id).style.visibility = "hidden"
}

function at_click() {
    p = e(this["at_parent"]);
    c = e(this["at_child"]);
    if (c.style.visibility != "visible") {
        at_show_aux(p.id, c.id)
    } else {
        c.style.visibility = "hidden"
    }
    return false
}

function at_attach(d, g, b, a, f) {
    p = e(d);
    c = e(g);
    p.at_parent = p.id;
    c.at_parent = p.id;
    p.at_child = c.id;
    c.at_child = c.id;
    p.at_position = a;
    c.at_position = a;
    c.style.position = "absolute";
    c.style.visibility = "hidden";
    switch (b) {
        case "click":
            p.onclick = at_click;
            p.onmouseout = at_hide;
            c.onmouseover = at_show;
            c.onmouseout = at_hide;
            break;
        case "hover":
            p.onmouseover = at_show;
            p.onmouseout = at_hide;
            c.onmouseover = at_show;
            c.onmouseout = at_hide;
            break
    }
};
