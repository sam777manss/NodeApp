var createError = require('http-errors');
var express = require('express');
var path = require('path');
var db = require('./std');
// var pop = require('alert') ;
var alert = require('alert');
const session = require('express-session');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var termsRouter = require('./routes/terms');
// var que1Router = require('./routes/que1');
// var adminRouter = require('./routes/admin');
var htmlqRouter = require('./routes/qhtml');
var cssqRouter = require('./routes/qcss');
var javascriptqRouter = require('./routes/qjavascript');
var app = express();
var retrivequeRouter = require('./routes/retriveque');
var adminRouter = require('./routes/admin');
var homepage = require('./routes/index');
var addnewRouter = require('./routes/addnew');
var updatetermsRouter = require('./routes/updateterms');
var cssquiz1Router = require('./routes/cssquiz1');
var javascriptquiz1Router = require('./routes/javascriptquiz1');
var tqpageRouter = require('./routes/tq');
// var updateusers = require('./routes/upuser');
var rhtmlRouter = require('./routes/rhtml');
var rcssRouter = require('./routes/rcss');
var rjavascriptRouter = require('./routes/rjavascript');




// session
app.use(session({
    secret: 'SecretStringForSession',
    cookie: { maxAge: 60000 * 60 },
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('adminpanel'));
app.use(express.static('homepage'));
// app.get('/admin',path.join(__dirname,))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// admin panel

app.get('/admin', function (req, res) {
    sess = req.session;
    if (sess.userId && sess.admin) {
        res.render('admin');
    } else {
        res.redirect('login')
    }

});


// hoempage
app.get('/', function (req, res) {
    res.render('index');

});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/terms', termsRouter);
// app.use('/que1',que1Router);
// app.use('/admin',adminRouter);
app.use('/qhtml', htmlqRouter);
app.use('/qcss', cssqRouter);
app.use('/qjavascript', javascriptqRouter);
app.use('/que1', retrivequeRouter);
app.use('/admin', adminRouter);

app.use('/index', homepage);
app.use('/addnew', addnewRouter);
app.use('/updateterms', updatetermsRouter);
app.use('/cssquiz1', cssquiz1Router);
app.use('/javascriptquiz1', javascriptquiz1Router);

app.use('/tq', tqpageRouter);
// app.use('/upuser/:s_id', updateusers);
// app.use('/delqh/:q', delquehtml);

app.use('/rhtml', rhtmlRouter);
app.use('/rcss', rcssRouter);
app.use('/rjavascript', rjavascriptRouter);




// DELETE QUE HTML TABEL
app.get('/delqh/:q', function (req, res, next) {
    db.query(`delete  from qhtml where q=$1`, [req.params.q], (err, result) => {
        if (!err) {
            // res.send(result.rows);
            alert("Delete Succesfully");
            // console.log(result.rows);
            res.redirect('/qhtml')
        }
        else {
            console.log(err.stack);
        }
    });
    db.end;

});
// DELETE QUE CSS TABEL
app.get('/delqcss/:q', function (req, res, next) {
    db.query(`delete  from qcss where q=$1`, [req.params.q], (err, result) => {
        if (!err) {
            // res.send(result.rows);
            alert("Delete Succesfully");
            // console.log(result.rows);
            res.redirect('/qcss')
        }
        else {
            console.log(err.stack);
        }
    });
    db.end;

});
// DELETE QUE HTML TABEL
app.get('/delqjs/:q', function (req, res, next) {
    db.query(`delete  from qjavascript where q=$1`, [req.params.q], (err, result) => {
        if (!err) {
            // res.send(result.rows);
            alert("Delete Succesfully");
            // console.log(result.rows);
            res.redirect('/qjavascript')
        }
        else {
            console.log(err.stack);
        }
    });
    db.end;

});

// DELETE USER DATA TABEL
app.get('/deldata/:email', function (req, res, next) {
    db.query(`delete  from users where email=$1`, [req.params.email], (err, result) => {
        if (!err) {
            // res.send(result.rows);
            alert("Delete Succesfully");
            // console.log(result.rows);
            res.redirect('/addnew')
        }
        else {
            console.log(err.stack);
        }
    });
    db.end;

});
// delete T&C
app.get('/deltndc/:terms', function (req, res, next) {
    db.query(`delete  from rules where terms=$1`, [req.params.terms], (err, result) => {
        if (!err) {
            // res.send(result.rows);
            alert("Delete Succesfully");
            // console.log(result.rows);
            res.redirect('/updateterms')
        }
        else {
            console.log(err.stack);
        }
    });
    db.end;
});


// update users
app.post('/upuser/:s_id', function (req, res, next) {
    db.query('SELECT email from users where email =$1', [req.body.email], (err, result) => {
        if (true) {
            if (result.rowCount > 0) {
                if (result.rows[0].email == req.body.email) {
                    fe = true;
                    // JSAlert.alert("Email Already Registered ");
                    alert("Email Already Exits");
                    console.log('Email Already Exits');
                    return res.redirect('/addnew');
                }
            }
        }
        let user = req.body;
        console.log(user.name);
        console.log(req.params.s_id);
        let insertQuery = `UPDATE users
      SET name='${user.name}', email= '${user.email}', username='${user.username}', password='${user.password}', qualification='${user.qualification}'
      WHERE s_id= ${req.params.s_id}`;
        db.query(insertQuery, (err, result) => {
            if (!err) {
                alert("Update Succesfully");
                console.log('Update Successfulfrom admin');
            } else console.log(err.message);
        })
        res.redirect('/addnew');
    });
});

// update html 
app.post('/uphtml/:id', function (req, res, next) {
    db.query('SELECT q from qhtml where q =$1', [req.body.q], (err, result) => {
        if (true) {
            if (result.rowCount > 0) {
                if (result.rows[0].q == req.body.q) {
                    fe = true;
                    // JSAlert.alert("Email Already Registered ");
                    alert("Question Already Exits");
                    console.log('Question Already Exits');
                    return res.redirect('/qhtml');
                }
            }
        }
        console.log("Post Router");
        // store all the user input data
        let user = req.body;
        let insertQuery = `UPDATE qhtml SET q='${user.q}', a= '${user.a}', b='${user.b}', c='${user.c}', d='${user.d}',ans='${user.ans}'
    WHERE id= ${req.params.id}`;
        db.query(insertQuery, (err, result) => {
            console.log("Query Runnnn");
            if (!err) {
                // res.render('form', { create: result.rows })
                // res.send('Insertion was successful');
                alert("Update Succesfully");
                console.log('update que of html');
            }
            else console.log(err.message);
        })
        res.redirect('/qhtml');
    });
});

//  update css
app.post('/upcss/:id', function (req, res, next) {
    db.query('SELECT q from qcss where q =$1', [req.body.q], (err, result) => {
        if (true) {
            if (result.rowCount > 0) {
                if (result.rows[0].q == req.body.q) {
                    fe = true;
                    // JSAlert.alert("Email Already Registered ");
                    alert("Question Already Exits");
                    console.log('Question Already Exits');
                    return res.redirect('/qcss');
                }
            }
        }
        console.log("Post Router");
        // store all the user input data
        let user = req.body;
        let insertQuery = `UPDATE qcss SET q='${user.q}', a= '${user.a}', b='${user.b}', c='${user.c}', d='${user.d}',ans='${user.ans}'
    WHERE id= ${req.params.id}`;
        db.query(insertQuery, (err, result) => {
            console.log("Query Runnnn");
            if (!err) {
                // res.render('form', { create: result.rows })
                // res.send('Insertion was successful');
                alert("Update Succesfully");
                console.log('update que of css');
            }
            else console.log(err.message);
        })
        res.redirect('/qcss');
    });
});

// update JS
app.post('/upjs/:id', function (req, res, next) {
    db.query('SELECT q from qjavascript where q =$1', [req.body.q], (err, result) => {
        if (true) {
            if (result.rowCount > 0) {
                if (result.rows[0].q == req.body.q) {
                    fe = true;
                    // JSAlert.alert("Email Already Registered ");
                    alert("Questions Already Exits");
                    console.log('Questions Already Exits');
                    return res.redirect('/qjavascript');
                }
            }
        }
        console.log("Post Router");
        // store all the user input data
        let user = req.body;
        let insertQuery = `UPDATE qjavascript SET q='${user.q}', a= '${user.a}', b='${user.b}', c='${user.c}', d='${user.d}',ans='${user.ans}'
    WHERE id= ${req.params.id}`;
        db.query(insertQuery, (err, result) => {
            console.log("Query Runnnn");
            if (!err) {
                // res.render('form', { create: result.rows })
                // res.send('Insertion was successful');
                alert("Update Succesfully");
                console.log('update que of js');
            }
            else console.log(err.message);
        })
        res.redirect('/qjavascript');
    });
});

// update T&C
app.post('/upterms/:id', function (req, res, next) {
    db.query('SELECT terms from rules where terms =$1', [req.body.terms], (err, result) => {
        if (true) {
            if (result.rowCount > 0) {
                if (result.rows[0].terms == req.body.terms) {
                    fe = true;
                    // JSAlert.alert("Email Already Registered ");
                    alert("Terms Already Exits");
                    console.log('Terms Already Exits');
                    return res.redirect('/updateterms');
                }
            }
        }
        let rules = req.body;
        console.log(rules.terms);
        console.log(req.params.id);
        let insertQuery = `UPDATE rules
  SET terms= '${rules.terms}'
  WHERE id= ${req.params.id}`;
        db.query(insertQuery, (err, result) => {
            if (!err) {
                alert("Update Succesfully");
                console.log('Update terms ');
            } else console.log(err.message);
        })
        res.redirect('/updateterms');
    });
});

// logout
app.get('/logout', function (req, res) {
    // sess = req.session;
    req.session.destroy();
    res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
