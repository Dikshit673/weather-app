import React from "react";

const Navbar = () => {
    const [state, setState] = React.useState(false);

    return (
        <>
            <section className="main_section">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">

                        <h3 className=" d-flex justify-content-start align-items-center"><i className="fab fa-react react_rotate"></i>React</h3>

                        <button className="navbar-toggler" title="menu toggler" type="button" onClick={() => setState(!state)} >
                            {state ? <i className="fa-solid fa-times"></i> : <i className="fa fa-bars"></i>}
                        </button>

                        <div className={`collapse navbar-collapse ${state ? "show" : ""}`}>
                            <ul className="navbar-nav ms-auto xyz">
                                <li className="nav-item"><i className="fa-solid fa-house me-1 icons_anim" />Home</li>
                                <li className="nav-item"><i className="fa-solid fa-address-card me-1 icons_anim" />About</li>
                                <li className="nav-item"><i className="fa-solid fa-phone me-1 icons_anim" />Contact</li>
                                <li className="nav-item"><i className="fa-solid fa-list me-1 icons_anim" />Service</li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </section>
        </>
    );
};

export default Navbar;
