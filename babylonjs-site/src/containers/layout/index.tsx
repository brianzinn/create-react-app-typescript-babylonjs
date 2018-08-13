import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 col-lg-3">
                        <div className="main-nav">
                            <div className="navbar navbar-inverse">
                                <div className="navbar-header">
                                    <button
                                        type="button"
                                        className="navbar-toggle"
                                        data-toggle="collapse"
                                        data-target=".navbar-collapse"
                                    >
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                    <Link className="navbar-brand" to={'/'}>Home</Link>
                                </div>
                                <div className="clearfix" />
                                <div className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav">
                                        <li>
                                            <NavLink exact={true} to={'/'} activeClassName="active">
                                                <span className="glyphicon glyphicon-home" /> Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/about'} activeClassName="active">
                                                <span className="glyphicon glyphicon-play" /> About
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/todo'} activeClassName="active">
                                                <span className="glyphicon glyphicon-play" /> To Do
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9 col-lg-9">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}