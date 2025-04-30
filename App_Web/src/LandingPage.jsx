import './landingPage/css/blue.css'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const goToRegistration = () => {
        navigate('/');
    };
    return (
        <div>
            <head>
                {/* Required meta tags */}
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>Dynamic</title>
                <meta name="description" content="Dynamic es un sistema de gestión para centros deportivos." />

                {/* Inter UI font */}
                <link href="https://rsms.me/inter/inter-ui.css" rel="stylesheet" />

                {/* vendors styles */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />

                {/* Bootstrap CSS / Color Scheme */}
                <link rel="stylesheet" href="css/blue.css" id="theme-color" />
            </head>
            <body>
                {/* navigation */}
                <section className="smart-scroll">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-md navbar-dark">
                            <a className="navbar-brand heading-black" href="index.html">
                                Dynamic
                            </a>
                            <button className="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse"
                                data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span data-feather="grid"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link page-scroll" href="#features">Features</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link page-scroll" href="#pricing">Pricing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link page-scroll" href="#faq">FAQ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link page-scroll" href="#blog">Blog</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link page-scroll d-flex flex-row align-items-center text-primary" onClick={goToRegistration}>
                                            <em data-feather="layout" width="18" height="18" className="mr-2"></em>
                                            Regístrate ahora
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </section>

                {/* hero header */}
                <section className="py-7 py-md-0 bg-hero" id="home">
                    <div className="container">
                        <div className="row vh-md-100">
                            <div className="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
                                <img src="../assets/logo_dynamic_lema_blanco.png" alt="Dynamic" className="Dynamic-logo-landing" />
                                <h1 className="heading-black text-capitalize">Gestiona tu centro deportivo</h1>
                                <p className="lead py-3">Dynamic es una plataforma que ayuda a gimnasios a llevar un listado de sus clientes registrados.</p>
                                <button className="btn btn-primary d-inline-flex flex-row align-items-center">
                                    Regístrate ahora
                                    <em className="ml-2" data-feather="arrow-right"></em>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* features section */}
                <section className="pt-6 pb-7" id="features">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center">
                                <h2 className="heading-black">Knight offers everything you need.</h2>
                                <p className="text-muted lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in nisi commodo, tempus odio a, vestibulum nibh.</p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-10 mx-auto">
                                <div className="row feature-boxes">
                                    <div className="col-md-6 box">
                                        <div className="icon-box box-primary">
                                            <div className="icon-box-inner">
                                                <span data-feather="edit-3" width="35" height="35"></span>
                                            </div>
                                        </div>
                                        <h5>Create once. Share everywhere.</h5>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in nisi commodo, tempus odio a, vestibulum nibh.</p>
                                    </div>
                                    <div className="col-md-6 box">
                                        <div className="icon-box box-success">
                                            <div className="icon-box-inner">
                                                <span data-feather="monitor" width="35" height="35"></span>
                                            </div>
                                        </div>
                                        <h5>Unlimited devices</h5>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in nisi commodo, tempus odio a, vestibulum nibh.</p>
                                    </div>
                                    <div className="col-md-6 box">
                                        <div className="icon-box box-danger">
                                            <div className="icon-box-inner">
                                                <span data-feather="layout" width="35" height="35"></span>
                                            </div>
                                        </div>
                                        <h5>Beautiful templates & layouts</h5>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in nisi commodo, tempus odio a, vestibulum nibh.</p>
                                    </div>
                                    <div className="col-md-6 box">
                                        <div className="icon-box box-info">
                                            <div className="icon-box-inner">
                                                <span data-feather="globe" width="35" height="35"></span>
                                            </div>
                                        </div>
                                        <h5>Available globally</h5>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in nisi commodo, tempus odio a, vestibulum nibh.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* pricing section */}
                <section className="py-7 bg-dark section-angle top-right bottom-right" id="pricing">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center">
                                <h2 className="text-white heading-black">Choose your pricing plan.</h2>
                                <p className="text-light lead">Simply pricing - 7 Days free trial</p>
                            </div>
                        </div>
                        {/* pricing tables */}
                        <div className="row pt-5 pricing-table">
                            <div className="col-12 mx-auto">
                                <div className="card-deck pricing-table">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title pt-3">Personal</h3>
                                            <h2 className="card-title text-primary mb-0 pt-4">$59</h2>
                                            <div className="text-muted font-weight-medium mt-2">per month</div>
                                            <ul className="list-unstyled pricing-list">
                                                <li>1 user</li>
                                                <li>10 websites</li>
                                                <li>Access to premium templates</li>
                                                <li>Basic support</li>
                                            </ul>
                                            <a href="#" className="btn btn-primary">
                                                Start free trial
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title pt-3">Agency</h3>
                                            <h2 className="card-title text-info mb-0 pt-4">$159</h2>
                                            <div className="text-muted font-weight-medium mt-2">per month</div>
                                            <ul className="list-unstyled pricing-list">
                                                <li>2-15 users</li>
                                                <li>50 websites</li>
                                                <li>Access to premium templates</li>
                                                <li>Priority support</li>
                                            </ul>
                                            <a href="#" className="btn btn-info">
                                                Start free trial
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title pt-3">Enterprise</h3>
                                            <h2 className="card-title text-primary mb-0 pt-4">$499</h2>
                                            <div className="text-muted font-weight-medium mt-2">per month</div>
                                            <ul className="list-unstyled pricing-list">
                                                <li>Unlimited users</li>
                                                <li>Unlimited websites</li>
                                                <li>Access to premium templates</li>
                                                <li>24/7 support</li>
                                            </ul>
                                            <a href="#" className="btn btn-primary">
                                                Start free trial
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* faq section */}
                <section className="py-7" id="faq">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center">
                                <h2>Frequently asked questions</h2>
                                <p className="text-muted lead">Answers to most common questions.</p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-10 mx-auto">
                                <div className="row">
                                    <div className="col-md-6 mb-5">
                                        <h6>Can I try it for free?</h6>
                                        <p className="text-muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imper per tem por legere me doming.</p>
                                    </div>
                                    <div className="col-md-6 mb-5">
                                        <h6>Do you have hidden fees?</h6>
                                        <p className="text-muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imper per tem por legere me doming.</p>
                                    </div>
                                    <div className="col-md-6 mb-5">
                                        <h6>What are the payment methods you accept?</h6>
                                        <p className="text-muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imper per tem por legere me doming.</p>
                                    </div>
                                    <div className="col-md-6 mb-5">
                                        <h6>How often do you release updates?</h6>
                                        <p className="text-muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imper per tem por legere me doming.</p>
                                    </div>
                                    <div className="col-md-6 mb-5">
                                        <h6>What is your refund policy?</h6>
                                        <p className="text-muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imper per tem por legere me doming.</p>
                                    </div>
                                    <div className="col-md-6 mb-5">
                                        <h6>How can I contact you?</h6>
                                        <p className="text-muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imper per tem por legere me doming.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6 mx-auto text-center">
                                <h5 className="mb-4">Have questions?</h5>
                                <a href="#" className="btn btn-primary">Contact us</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* news section */}
                <section className="py-7 bg-dark section-angle top-left bottom-left" id="blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center">
                                <h2 className="heading-black">News from Knight.</h2>
                                <p className="text-muted lead">What&apos;s new at Knight.</p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <div className="card">
                                    <a href="#">
                                        <img className="card-img-top img-raised" src="img/blog-1.jpg" alt="Blog 1" />
                                    </a>
                                    <div className="card-body">
                                        <a href="#" className="card-title mb-2"><h5>We launch new iOS & Android mobile apps</h5></a>
                                        <p className="text-muted small-xl mb-2">Sep 27, 2018</p>
                                        <p className="card-text">Nam liber tempor cum soluta nobis eleifend option congue nihil imper,
                                            consectetur adipiscing elit. <a href="#">Learn more</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <a href="#">
                                        <img className="card-img-top img-raised" src="img/blog-2.jpg" alt="Blog 2" />
                                    </a>
                                    <div className="card-body">
                                        <a href="#" className="card-title mb-2"><h5>New update is available for the editor</h5></a>
                                        <p className="text-muted small-xl mb-2">August 16, 2018</p>
                                        <p className="card-text">Nam liber tempor cum soluta nobis eleifend option congue nihil imper,
                                            consectetur adipiscing elit. <a href="#">Learn more</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <a href="#">
                                        <img className="card-img-top img-raised" src="img/blog-3.jpg" alt="Blog 3" />
                                    </a>
                                    <div className="card-body">
                                        <a href="#" className="card-title mb-2"><h5>The story of building #1 page builder</h5></a>
                                        <p className="text-muted small-xl mb-2">December 2nd, 2017</p>
                                        <p className="card-text">Nam liber tempor cum soluta nobis eleifend option congue nihil imper,
                                            consectetur adipiscing elit. <a href="#">Learn more</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-6">
                            <div className="col-md-6 mx-auto text-center">
                                <a href="#" className="btn btn-primary">View all posts</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* footer */}
                <footer className="py-6">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 mr-auto">
                                <h5>About Knight</h5>
                                <p className="text-muted">Magnis modipsae que voloratati andigen daepeditem quiate conecus aut labore.
                                    Laceaque quiae sitiorem rest non restibusaes maio es dem tumquam explabo.</p>
                                <ul className="list-inline social social-sm">
                                    <li className="list-inline-item">
                                        <a href=""><i className="fa fa-facebook"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href=""><i className="fa fa-twitter"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href=""><i className="fa fa-google-plus"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href=""><i className="fa fa-dribbble"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-2">
                                <h5>Legal</h5>
                                <ul className="list-unstyled">
                                    <li><a href="#">Privacy</a></li>
                                    <li><a href="#">Terms</a></li>
                                    <li><a href="#">Refund policy</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-2">
                                <h5>Partner</h5>
                                <ul className="list-unstyled">
                                    <li><a href="#">Refer a friend</a></li>
                                    <li><a href="#">Affiliates</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-2">
                                <h5>Help</h5>
                                <ul className="list-unstyled">
                                    <li><a href="#">Support</a></li>
                                    <li><a href="#">Log in</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 text-muted text-center small-xl">
                                &copy; 2019 Knight - All Rights Reserved
                            </div>
                        </div>
                    </div>
                </footer>

                {/* scroll to top */}
                <div className="scroll-top">
                    <i className="fa fa-angle-up" aria-hidden="true"></i>
                </div>
                {/* jQuery first, then Popper.js, then Bootstrap JS */}
                <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.7.3/feather.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
                <script src="js/scripts.js"></script>
            </body>
        </div>
    );
};

export default LandingPage;
