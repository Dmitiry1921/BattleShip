/**
 * Created by Дмитрий on 28.01.2016.
 */
var bs = {
        /**
         * id на поле:
         * 1 - корабль
         * 2 - сетка
         * 3 - мимо
         * 4 - попал
         */
        game: false,
        stop: false,
        level: false, //Уровень сложности бота.
        player: true, //Определяем кто сейчас ходит, true игрок  false бот.
        check_res: [], //Массив возвращенный после проверки координат корабля.
        field: [], //Игровое поле игрока.
        ships: {
            itm: {a: 1, b: 2, c: 3, d: 4},
            builder: {
                "d0": [],
                "c0": [],
                "c1": [],
                "b0": [],
                "b1": [],
                "b2": [],
                "a0": [],
                "a1": [],
                "a2": [],
                "a3": []
            },
            stay: {
                "a0": undefined,
                "a1": undefined,
                "a2": undefined,
                "a3": undefined,
                "b0": undefined,
                "b1": undefined,
                "b2": undefined,
                "c0": undefined,
                "c1": undefined,
                "d0": undefined
            },
            cut:{
                "d0": [],
                "c0": [],
                "c1": [],
                "b0": [],
                "b1": [],
                "b2": [],
                "a0": [],
                "a1": [],
                "a2": [],
                "a3": []
            }
        }, //Информация о кораблях игрока.
        setting: {
            botTimeRun : 500
        },
        bot:{
            memory: {
                id: undefined,
                map: {
                    "d0": [],
                    "c0": [],
                    "c1": [],
                    "b0": [],
                    "b1": [],
                    "b2": [],
                    "a0": [],
                    "a1": [],
                    "a2": [],
                    "a3": []
                }
            },
            ships: {
                itm: {a: 1, b: 2, c: 3, d: 4},
                builder: {
                    "d0": [],
                    "c0": [],
                    "c1": [],
                    "b0": [],
                    "b1": [],
                    "b2": [],
                    "a0": [],
                    "a1": [],
                    "a2": [],
                    "a3": []
                },
                stay: {
                    "a0": undefined,
                    "a1": undefined,
                    "a2": undefined,
                    "a3": undefined,
                    "b0": undefined,
                    "b1": undefined,
                    "b2": undefined,
                    "c0": undefined,
                    "c1": undefined,
                    "d0": undefined
                },
                cut:{
                    "d0": [],
                    "c0": [],
                    "c1": [],
                    "b0": [],
                    "b1": [],
                    "b2": [],
                    "a0": [],
                    "a1": [],
                    "a2": [],
                    "a3": []
                }
            },
            check_res: [],
            field: [], //игровое поле бота.
            rand: [], //Массив с доступными координатами.
            get: {
                array: function(){
                    var resault=[], q= 0,
                        obj = bs.bot;
                    for(var x = 0; x < obj.field.length; x++){
                        for(var y = 0; y < obj.field.length; y++){
                            if(obj.field[x][y].id == 0){
                                resault[q] =
                                {
                                    x: x,
                                    y: y
                                };
                                q++;
                            }
                        }
                    }
                    return resault;
                }, //Получаем массив с доступными координатами для установки кораблей.
                position: function(id,i){
                    if(i == undefined) i = 0;
                    //получаем список доступных координат.
                    var obj = bs.bot.get,
                        a = obj.array(),//получаем список доступных координат.
                        itm = a[bs.random(0, a.length - 1)],
                        pos = bs.random(0, 1);
                    if (pos == 0) pos = "h"; else pos = "v";
                    if (bs.checkCoor(itm.x, itm.y, pos, id, true)) {
                        bs.stayHere(itm.x, itm.y, pos, id, true);
                    } else {
                        i++;
                        obj.position(id, i);
                    }

                },
                field: function(){
                    var obj = bs.bot;
                    for(var id in obj.ships.builder){
                        obj.get.position(id);
                    }
                }
            },
            resRunArr:[],
            load: function(){
                bs.bot.field = bs.createField(10,10,"bot"); //создаем поле бота.
                bs.bot.get.field();
            },//Создание бота.
            runArr: function(){
                var obj = bs.field;
                bs.bot.resRunArr = [];
                var q=0;
                for (var x in obj) {
                    for (var y in obj[x]) {
                        var itm = obj[x][y];
                        if (itm.id != 4 && itm.id != 3){
                            bs.bot.resRunArr[q] = {
                                id: obj[x][y].id,
                                ship: obj[x][y].ship,
                                x:x,
                                y:y
                            };
                            q++;
                        }
                    }
                }
                return bs.bot.resRunArr;
            },
            map: function(id){
                //Прорисовываем карту для этого корабля.
                var bool = false,
                    length = bs.ships.cut[id].length,
                    cut = bs.ships.cut,
                    memory = bs.bot.memory;
                    if(length != bs.bot.ships.itm[id[0]]){
                        bs.bot.memory.map[id] = [];//Очищаем массив от старой карты.
                        if(length == 1){
                            //"Крест"
                            //Получаем координаты
                            var itm = bs.ships.cut[id][0],
                                x = parseInt(itm.x),
                                y = parseInt(itm.y), obj;
                            if(bs.range(x-1) && bs.range(y)){obj = bs.field[x-1][y]; if(obj.id != 3 && obj.id != 4) memory.map[id].push({x: x-1,y:y, id:obj.id, ship:obj.ship});}
                            if(bs.range(x+1) && bs.range(y)){obj = bs.field[x+1][y]; if(obj.id != 3 && obj.id != 4) memory.map[id].push({x: x+1,y:y, id:obj.id, ship:obj.ship});}
                            if(bs.range(x) && bs.range(y-1)){obj = bs.field[x][y-1]; if(obj.id != 3 && obj.id != 4) memory.map[id].push({x: x,y:y-1, id:obj.id, ship:obj.ship});}
                            if(bs.range(x) && bs.range(y+1)){obj = bs.field[x][y+1]; if(obj.id != 3 && obj.id != 4) memory.map[id].push({x: x,y:y+1, id:obj.id, ship:obj.ship});}
                        }else{
                            var arr = {
                                x:[],
                                y:[]
                            };
                            for(var i=0; i<cut[id].length; i++){
                                var val = cut[id][i];
                                arr.x.push(parseInt(val.x));
                                arr.y.push(parseInt(val.y));
                            }
                            var minx,maxx,miny,maxy;
                            minx = Math.min.apply(null,arr.x);
                            maxx = Math.max.apply(null,arr.x);
                            miny = Math.min.apply(null,arr.y);
                            maxy = Math.max.apply(null,arr.y);
                            if(minx == maxx){
                                //Горисонтально.
                                if(bs.range(miny-1)) {
                                    var obj = bs.field[minx][miny - 1];
                                    if (obj.id != 3 && obj.id != 4) memory.map[id].push({
                                        x: minx,
                                        y: miny-1,
                                        id: obj.id,
                                        ship: obj.ship
                                    });
                                }
                                if(bs.range(maxy+1)) {
                                    var obj = bs.field[minx][maxy+1];
                                    if (obj.id != 3 && obj.id != 4) memory.map[id].push({
                                        x: minx,
                                        y: maxy+1,
                                        id: obj.id,
                                        ship: obj.ship
                                    });
                                }
                            }else if(miny == maxy){
                                if(bs.range(minx-1)) {
                                    var obj = bs.field[minx-1][miny];
                                    if (obj.id != 3 && obj.id != 4) memory.map[id].push({
                                        x: minx-1,
                                        y: miny,
                                        id: obj.id,
                                        ship: obj.ship
                                    });
                                }
                                if(bs.range(maxx+1)) {
                                    var obj = bs.field[maxx+1][maxy];
                                    if (obj.id != 3 && obj.id != 4) memory.map[id].push({
                                        x: maxx+1,
                                        y: maxy,
                                        id: obj.id,
                                        ship: obj.ship
                                    });
                                }
                            }
                        }
                        bool = true;
                    }
                return bool;
            },
            run: function(){
            if(!bs.stop) {
                    //Легкий уровень сложности.
                    var obj = bs.bot,
                        arr = obj.runArr(),
                        rand = bs.random(0, (arr.length - 1)), //Получаем случайные координаты
                        itm = arr[rand],
                        mem = bs.bot.memory;
                    if(bs.level && mem.id != undefined){
                        if(obj.map(mem.id)){
                            var map = mem.map[mem.id];
                                itm = map[bs.random(0,map.length-1)];
                        }else   bs.bot.memory.id = undefined; //Обнуляем id.
                    }
                    var shoot = $(".my-field .itm[x=" + itm.x + "][y=" + itm.y + "]");
                    if (itm.id == 1){
                        bs.bot.memory.id = itm.ship; //Запоминаем id корабля в который попали.
                        //Записываем попадание по тому или иному кораблю..
                        bs.ships.cut[itm.ship].push({
                            x: itm.x,
                            y: itm.y
                        });
                        bs.field[itm.x][itm.y].id = 4; //Засчитываем попадание по кораблю.
                        shoot.addClass("cut"); //отображаем на поле.
                        //Проверяем убит от корабль или нет
                        bs.kill(true);
                        //Ходим еще раз.
                        if (!bs.lose()) { //Игрок не проиграл ?
                            setTimeout(function(){
                                bs.bot.run();
                            },bs.setting.botTimeRun);
                        }else bs.status("Вы проиграли, попробовать еще раз ?");
                    } else {
                        bs.status("Ваш ход !!!");
                        bs.field[itm.x][itm.y].id = 3; //Записываем промах.
                        shoot.addClass("miss");//отображаем на поле.
                        //Отдаем ход игроку..
                        bs.player = true;
                    }
                }
            }
        }, //противник игрока в Одиночном режиме.
        get: {
            clerField: function () {
                bs.field = bs.createField(10, 10);
                bs.get.cleanItm(".my-field .itm");
            },
            cleanItm: function(itm){
                $(itm)
                    .removeClass("point")
                    .removeClass("ship")
                    .removeClass("ship-h")
                    .removeClass("ship-v")
                    .removeClass("ship-h-t")
                    .removeClass("ship-v-t")
                    .removeClass("ship-h-b")
                    .removeClass("ship-v-b");
            },
            goTo: function (x, y, pos, id) {
                var itm = $(".my-field .itm[x=" + x + "][y=" + y + "]"),
                    param = bs.get.coord(itm[0]),
                    ship = $(".line div[pos][ship=" + id + "]");
                ship.attr("pos", pos).stop().animate({
                    top: param.top + "px",
                    left: param.left + "px",
                }, "slow",function(){
                    bs.calc();
                });
            },
            array: function () {
                var resault = [], q = 0,
                    obj = bs;
                for (var x = 0; x < obj.field.length; x++) {
                    for (var y = 0; y < obj.field.length; y++) {
                        if (obj.field[x][y].id == 0) {
                            resault[q] =
                            {
                                x: x,
                                y: y
                            };
                            q++;
                        }
                    }
                }
                return resault;
            }, //Получаем массив с доступными координатами для установки кораблей.
            position: function (id, i) {
                if (i == undefined) i = 0;
                //получаем список доступных координат.
                var obj = bs.get,
                    a = obj.array(),//получаем список доступных координат.
                    itm = a[bs.random(0, a.length - 1)],
                    pos = bs.random(0, 1);
                if (pos == 0) pos = "h"; else pos = "v";
                if (bs.checkCoor(itm.x, itm.y, pos, id)) {
                    bs.stayHere(itm.x, itm.y, pos, id);
                } else {
                    i++;
                    obj.position(id, i);
                }
            },
            field: function () {
                if(!bs.game) {
                    var obj = bs;
                    //Очищаем игровое поле.
                    obj.get.clerField();
                    for (var id in obj.ships.builder) {
                        obj.get.position(id);
                    }
                    obj.ready();
                }
            },
            coord: function (elem) {
                var obj = bs.get;
                if (elem.getBoundingClientRect)
                    // "правильный" вариант
                    return obj.offsetRect(elem)

            },
            offsetRect: function (elem) {
                var top = 0, left = 0
                while (elem) {
                    top = top + parseInt(elem.offsetTop)
                    left = left + parseInt(elem.offsetLeft)
                    elem = elem.offsetParent
                }
                return {top: top, left: left}
            }
        },//размещает корабли игрока случайным обзозом на поле.
        load: function(){
            bs.field = bs.createField(10,10); //создаем поле игрока
            bs.bot.load();
            bs.getPositionClone();
            bs.calc();
        },// Эту функцию необходимо возвать сразу после закрузки страницы.
        random: function(min,max){
            var rand = min + Math.random() * (max + 1 - min);
            rand = Math.floor(rand);
            return rand;
        },//генерирует случайное число в заданом диапазоне
        createField: function (rows,columns){
            var arr = [];
            for(var i=0; i<columns; i++){
                arr[i] = [];
                for(var j=0; j<rows; j++){
                    arr[i][j] = {
                        id: 0,
                        ship: null
                    };//наполняем игровое поле начальными данныими
                }
            }
            return arr;
        },//Создает двух мрный массив заданных размеров.
        shipDdrop: function (e, ui) {
            var itm = {
                x: $(e).attr("x"),
                y: $(e).attr("y"),
                id: $(ui.draggable).attr("ship"),
                pos: $(ui.draggable).attr("pos")
            };
            var goCalc = true;
            //до проверки координат их нужно очистить,
            bs.cleanField(itm.id);
            //но перед тем как очищать нужно убедиться что данный корабль сюда можно установить.
            if (bs.checkCoor(itm.x, itm.y, itm.pos, itm.id)) {
                bs.stayHere(itm.x, itm.y, itm.pos, itm.id);
            } else {
                goCalc = false;
                //Возврат корабля в исходное положение.
                bs.goBack(itm.id,function(){
                    goCalc = true;
                });
            }
            //Првоверяем готово ли игровое поле..
            bs.ready();
            //Выполняем пересчет кораблей для поставноки
            if(goCalc) bs.calc();
        }, //событие отпускания корабля в поле.
        checkCoor: function (x, y, pos, id, bot){
            var bool = false,
                x = parseInt(x),
                y = parseInt(y),
                obj = bs,
                q = 0, // Счетчик финального массива.
                qi = 0; //Счетчик палуб на корабле.
            if(bot) obj = bs.bot;
            //Обнуляем массив корабля.
            obj.check_res = [];
           // obj.ships.itm[id[0]]
            //Получаем новую точку отсчета в зависимости от типа коробля.
            for (var i = 0; i < (obj.ships.itm[id[0]] + 2); i++) {
                var a = undefined,
                    b = undefined,
                    c = undefined,
                    rx = undefined,
                    ry = undefined;
                if (pos == "h") {
                    var x0 = x - 1,
                        x1 = x + 1, //Получаем координаты для проверки.
                        j = (y - 1) + i;
                    if (bs.range(x0)) a = obj.field[x0][j];
                    if (bs.range(x1)) c = obj.field[x1][j];
                    if (bs.range(x))  b = obj.field[x][j];
                    rx = [x0, x, x1];
                    ry = [j, j, j];
                }else{
                    var y0 = y - 1,
                        y1 = y + 1, //Получаем координаты для проверки.
                        j = (x - 1) + i;
                    if (bs.range(y0) && bs.range(j)) a = obj.field[j][y0];
                    if (bs.range(y1) && bs.range(j)) c = obj.field[j][y1];
                    if (bs.range(y) && bs.range(j))  b = obj.field[j][y];
                    rx = [j, j, j];
                    ry = [y0, y, y1];
                }
                if (
                    (bs.rool(a, id)) &&
                    (bs.rool(b, id)) &&
                    (bs.rool(c, id))
                ) {
                    var sid = 0;
                    //Наполняем массив для отправки его в stayHere
                    if (a != undefined && a.id != 2) {
                        obj.check_res[q] = {x: rx[0], y: ry[0], id: 2, pos: pos};
                        q++;
                    }
                    if (b != undefined && b.id != 2) {
                        if (i != 0 && i != (bs.ships.itm[id[0]] + 1)) {
                            sid = 1;
                            qi++;
                        } else sid = 2;
                        obj.check_res[q] = {x: rx[1], y: ry[1], id: sid, pos: pos};
                        q++;
                    }
                    if (c != undefined && c.id != 2) {
                        obj.check_res[q] = {x: rx[2], y: ry[2], id: 2, pos: pos};
                        q++;
                    }
                    if (qi == bs.ships.itm[id[0]]) bool = true;
                } else {
                    obj.check_res = [];
                    bool = false;
                    break;
                }
            }
            return bool; //функция должна будет вернуть расположение коробля на карте... массивом.
        },//проверка координат.
        stayHere: function (x, y, pos, id, bot) {
            /*
             x- координата по оси Х
             y - координата по оси Y
             id - тип коробля
             */
            var bool = false,
                obj = bs,
                field,
                q=0;
            if(bot) obj = bs.bot;
            //начало прорисовки корабля.
            //1) прорисовываем корабль в навых координатах.
            for (var i = 0; i < obj.check_res.length; i++) {
                var itm = 0;
                itm = obj.check_res[i];
                obj.field[itm.x][itm.y] =
                {
                    id: itm.id,
                    ship: id,
                    pos: pos
                };
                if (itm.id == 2 && !bot) {
                    $(".my-field .itm[x=" + itm.x + "][y=" + itm.y + "]").addClass("point");
                }
                if(itm.id == 1){
                    if(q == 0) {
                        //анимировано устанавливаем корабль в нужное место.
                        if(!bot) obj.get.goTo(itm.x,itm.y,pos,id);
                    }
                    var clPos="",
                        close="";
                    if(id[0] != "a"){
                        clPos = "-"+pos,
                            close = "";
                        if(q == 0) close = "-t";
                        if(q == obj.ships.itm[id[0]]-1) close = "-b";
                    }
                    if (!bot){
                        $(".my-field .itm[x=" + itm.x + "][y=" + itm.y + "]").addClass("ship"+clPos+close);
                    }else{
                       //$(".enemy-field .itm[x=" + itm.x + "][y=" + itm.y + "]").addClass("ship"+clPos+close);
                    }
                    q++
                }
                //Записываем данные о том что корабль стоит в поле.
                bool = true;
            }
            //2) записываем новые координаты коробля в билдер.
            obj.ships.stay[id] = {
                x: x,
                y: y,
                stay: 1
            };
            obj.ships.builder[id] = []; //обнуляем координаты.
            obj.ships.builder[id] = obj.check_res; //записываем новые.
            //Конец прорисовки.
            return bool;
        },//рисуем корабль в провереных ранее координатах.
        shipRotate: function (ship) {
            var bool = false,
                id = $(ship).attr("ship"),
                pos = $(ship).attr("pos"),
                np = undefined,
                itm;
            //----------
            itm = bs.ships.stay[id];
            if (itm != undefined) {
                if (pos == "h") np = "v"; else np = "h";
                bs.cleanField(id);
                if (bs.checkCoor(itm.x, itm.y, np, id)) {
                    bs.stayHere(itm.x, itm.y, np, id);
                    $(".line div[ship = " + id + "]").attr("pos", np);
                    bool = true;
                } else {
                    if (bs.checkCoor(itm.x, itm.y, pos, id)) {
                        bs.stayHere(itm.x, itm.y, pos,id);
                        bs.shipError(id);
                    } else {
                        bs.goBack(id);
                    }
                }
            }
            return bool;
        },//поворот корабля. на 90градусов.
        cleanField: function (id) {
            var a = 1;
            if (bs.ships.builder[id].length > 0) { //Проверяем был ли этот корабль установлен ранее
                for (var i = 0; i < bs.ships.builder[id].length; i++) {
                    var itm = 0,
                        t = "";
                    itm = bs.ships.builder[id][i];
                    bs.field[itm.x][itm.y] =
                    {
                        id: 0,
                        ship: null
                    };
                    bs.get.cleanItm(".my-field .itm[x=" + itm.x + "][y=" + itm.y + "]");
                }
                //Удаляем данный корабль из массива.
                bs.ships.builder[id] = [];
                bs.ships.stay[id] = undefined;
            }
        },//удаляет корабль я заданых id из поля.
        rool: function (a, id) {
            if (typeof a == "object")
                return (a.id == 0 || a.id == 2 || a.id == undefined) || (a.ship == id || a.ship == null);
            else
                return a == undefined;
        }, //Некоторые повторяющиеся в коде правила.
        range: function (a) {
            return a >= 0 && a <= 9;
        },//проверяем входил ли число в заданый диапазон.
        goBack: function (id) {
            bs.ships.stay[id] = undefined;
            var data = $(".line[ship="+id[0]+"] .clone").data();
            //Возвращение корабля на исходное положение.
            $(".line div[pos][ship=" + id + "]").attr("pos", "h").animate({
                top: data.top,
                left: data.left
            }, 500,function(){
                bs.calc();
            });
        },//анимировано отправляем корабль в изначальное положение
        getPositionClone: function(){
            var itms = $(".left .clone");
            for(var i=0; i<itms.length; i++){
               var left = $(".left .clone")[i].offsetLeft;
               var top = $(".left .clone")[i].offsetTop;
                $(".left .clone:eq("+i+")").attr("data-left",left).attr("data-top",(top+2));
            }
        }, //
        shipError: function (id) {
            var itm = $(".line div[pos][ship=" + id + "]"),
                color = $(itm).css("border-color");
            $(itm).stop().animate({
                "border-color": "red"
            }, 0, function () {
                setTimeout(function () {
                    $(itm).stop().animate({
                        "border-color": "#3f51b5"
                    }, 300);
                }, 500);
            });
        },//анимация ошибки растановки корабля.
        netDraw: function (toogle,bool) {
            var canvas = $(".my-field .canvas");
            if (bool == undefined) bool = true;
            if (toogle == undefined){
                canvas.removeClass("off");
                var itm = bs.ships.builder;
                for (var id in itm) {
                    if (itm[id].length != 0) {
                        for (var i = 0; i < itm[id].length; i++) {
                            var q = undefined;
                            q = itm[id][i];
                            if (q.id == 2) $(".my-field .itm[x=" + q.x + "][y=" + q.y + "]").addClass("point");
                        }
                    }
                }
            }else{
                if(bool) canvas.addClass("off");
            }
        },//отображает или скрывает сеть с подсказками на поле.
        ready: function(bot,callback){
            var bool = false,
                count = 0,
                itm;
            if(bot) itm=bs.bot.field; else itm = bs.field;
            for(var x in itm){
                for(var y=0; y<10;y++){
                    if(itm[x][y].id == 1){
                        count++;
                    }
                }
            }
            if(count == 20) bool=true;
            if(bool){
                $(".enemy-field").addClass("start");
                bs.status("Нажмите на кнопку для начала игры..");
            }else{
                bs.status("Расположите корабли в поле");
                $(".enemy-field").removeClass("start");
            }
            if(callback != undefined) callback();
            return bool;
        },//проверяем готовность игрока к началу игры.
        calc: function() {
            //Выполняем подсчет сколько кораблей нужно еще расставить в поле для начала игры.
            var count = {
                a: 0, b: 0, c: 0, d: 0
            }
            for (var id in bs.ships.builder) {
                var data = $(".line[ship="+id[0]+"] .clone").data(),
                    itm = $(".line div[ship=" + id + "][pos]"),
                    left = itm.css("left"),
                    top = itm.css("top");
                if ((left == "auto" && top == "auto") || (left == data.left+"px" && top == data.top+"px")) {
                    count[id[0]]++
                }
            }
            for (var type in count) {
                $(".line[ship="+type+"] .num .x").text(count[type]);
            }
        },//Счетчик сколько кораблей нужно еще расположить что бы началась игра.
        status: function(text){
            var itm = $(".body.status");
            itm.text(text);
        }, //Изменяем статус
        start: function(){
            bs.game = true;
            var left = $(".left"),
                fields = $(".body.field"),
                start = $(".enemy-field"),
                itms = $(".itm"),
                site = $(".my-field .canvas");
            site.removeClass("off");
            left.addClass("game");
            fields.addClass("game");
            start.removeClass("start");
            itms.removeClass("ui-droppable").removeClass("point");
            bs.status("Ваш ход");
        },//Функция начала игры
        kill: function(bot){
            var obj = bs.bot;
            if(bot) obj = bs;
            for(var id in obj.ships.cut){
                var arr = obj.ships.cut[id];
                if(arr.length) {
                    if (arr.length == bs.ships.itm[id[0]]) {
                        //корабль сбит теперь мы обрисовываем его точками..
                        for(var i in obj.ships.builder[id]){
                            var itm = obj.ships.builder[id][i];
                           if(itm.id == 1){
                                for(var i=0; i<3; i++){
                                    var y=(itm.y-1)+i;
                                    for(var j=0; j<3; j++){
                                        var x=(itm.x-1)+j;
                                        if(bs.range(x) && bs.range(y)){
                                            if(obj.field[x][y].id == 2){
                                                obj.field[x][y].id = 3;
                                                if(!bot){
                                                    $(".enemy-field .itm[x="+x+"][y="+y+"]").addClass("point");
                                                    bs.bot.field[x][y].id = 3;
                                                }else{
                                                    $(".my-field .itm[x="+x+"][y="+y+"]").addClass("point");
                                                    bs.field[x][y].id = 3;
                                                }
                                            }
                                        }
                                    }
                                }
                           }
                        }
                    }
                }
            }
        },//Кораль утанул
        run: function(x,y,elem){
            if(bs.player && !bs.stop) {
                var obj = bs.bot.field[x][y];
                if (obj.id == 1) {
                    var lenght = bs.bot.ships.cut[obj.ship].length;
                    $(elem).addClass("cut");
                    bs.bot.field[x][y].id = 4;
                    //Записываем попадание по тому или иному кораблю..
                    bs.bot.ships.cut[obj.ship][lenght] = {
                        x: x,
                        y: y
                    };
                    //Определяем корабли которые мы потопили..
                    bs.kill();
                    if (bs.win()) {
                        bs.status("Вы победили !!!");
                    }
                } else {
                    //Промах..
                    bs.player = false;
                    bs.bot.field[x][y].id = 3; //Записываем просах на поле.
                    $(elem).addClass("miss");
                    //Выполняем ход бота..
                    bs.status("Подождите другой игрок ходит");
                    bs.bot.run();
                }
            }
        },//ход игрока
        win:function() {
            var b = false;
            //Проверяем выйграл ли игрок.
            var obj = bs.bot.field,
                q = 0;
            for (var x in obj) {
                for (var y in obj[x]) {
                    var itm = obj[x][y];
                    if (itm.id == 4) q++;
                }
            }
            if(q == 20) {
                bs.stop = true;
                b = true;
            }
            return b;
        },//Победа ?
        lose:function(){
            var b = false;
            //Проверяет проигал ли игрок.
            var obj = bs.field,
                q = 0;
            for (var x in obj) {
                for (var y in obj[x]) {
                    var itm = obj[x][y];
                    if (itm.id == 4) q++;
                }
            }
            if(q == 20){
                bs.stop = true;
                b = true;
            }
            return b;
        }//поражение ?
};
