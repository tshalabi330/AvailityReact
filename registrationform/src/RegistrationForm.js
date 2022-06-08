import React from 'react'

const validEmailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
const validPhoneNumber = new RegExp('^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$');
const validNames = new RegExp('/^[A-Za-z ]+$/');

const validateForm = errors => {
    let valid = true;
    if(errors === null) {
        return valid;
    }
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

export class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            npiNumber: "",
            address: "",
            phone: "",
            email: "",
            errors:{
                firstName: '',
                lastName: '',
                npiNumber: '',
                phone: '',
                email: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "deleteButton";
        btn.value = 'Delete';
        const tbodyRef = document.getElementById('registeredUsers').getElementsByTagName('tbody')[0];
        let newRow = tbodyRef.insertRow();
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(event.target[0].value + ' ' + event.target[1].value);
        newCell.appendChild(newText);
        newCell.appendChild(btn);
        for(var i = 2; i < 6; i++){
            newCell = newRow.insertCell();
            newText = document.createTextNode(event.target[i].value);
            newCell.appendChild(newText);
            newCell.appendChild(btn);
        }
        this.setState({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            npiNumber: this.state.npiNumber,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email
        })

    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                console.log('firstname change');
                errors.firstName =
                    validNames.test(value)
                        ? 'No special characters.'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    validNames.test(value)
                        ? ''
                        : 'Email is not valid.';
                break;
            case 'npiNumber':
                errors.npiNumber =
                    value.length < 8
                        ? 'NPI must be at least 8 digits!'
                        : '';
                break;
            case 'phone':
                errors.phone =
                    validPhoneNumber.test(value)
                        ? ''
                        : 'Phone is not valid!';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });

        if(validateForm(this.state.errors)){
            document.getElementById('button').disabled = false;
        } else {
            document.getElementById('button').disabled = true;
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>User Registration</h1>
                    <label>First Name</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        placeholder="First Name..." />
                    <br />
                    <label>Last Name</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        placeholder="Last Name..." />
                    <br />
                    <label>NPI Number</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        placeholder="NPI Number..." />
                    <br />
                    <label>Business Address</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        placeholder="Business Address..." />
                    <br />
                    <label>Phone</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        placeholder="Phone Number..." />
                    <br />
                    <label>Email</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        placeholder="Email Address..." />
                    <br />
                    <input id="button" type="submit" value="Submit" disabled={true} />
                </form>
                
                <table id='registeredUsers'>
                    <thead>
                        <tr>Registered Users</tr>
                    </thead>
                   <tbody>
                        <tr>
                            <td>Name</td>
                            <td>NPI Number</td>
                            <td>Business Address</td>
                            <td>Telephone Number</td>
                            <td>Email Address</td>
                        </tr>
                   </tbody>
                </table>
            </div>
            
        )
       
    }
}

export default RegistrationForm