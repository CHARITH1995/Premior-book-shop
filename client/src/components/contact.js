import React, { Component } from 'react';
import './contact.css';

class Contact extends Component {
    render() {
        return (
            <div>
                <div id="contact" class="container-fluid bg-primary">
                    <h2 className="name text-center">CONTACT US</h2>
                    <div className="row">
                        <div className="col-sm-5">
                            <p>Contact us and we'll get back to you within 24 hours.</p>
                            <p><span className="glyphicon glyphicon-map-marker"></span> Moratuwa , Sri Lanka</p>
                            <p><span className="glyphicon glyphicon-phone"></span> +94 0000000000</p>
                            <p><span className="glyphicon glyphicon-envelope"></span> perimer@gamil.com</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Contact;