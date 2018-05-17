import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class MainNav extends Component{
    static propTypes = {
        categories: PropTypes.array.isRequired,
        active: PropTypes.string.isRequired
    }

    render() {
        const { categories, active } = this.props;
        const currentTab = active;
        return (

            <div className={"main-nav-container"}>
                <ul className={"main-nav-list"}>
                    <li className={"main-nav-list-item " + (currentTab === 'all' ? 'active':'')}>
                        <Link
                            to={"/"}
                        >
                            <div className={"category"}>
                                All
                            </div>
                        </Link>
                    </li>
                    {categories.map( (category) => (
                        <li className={"main-nav-list-item " + (currentTab === category.name ? 'active':'')} key={category.path}>
                            <Link
                                to={"/" + category.path}
                            >
                                <div className={"category"}>
                                    {category.name}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MainNav