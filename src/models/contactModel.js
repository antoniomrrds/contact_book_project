const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false , default:''},
  email: { type: String, required: false , default:''},
  telephone: { type: String, required: false , default:''},
  created_on: { type: Date, required: false , default:Date.now},
 
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors =[];
    this.contact = null; 
} 

Contact.prototype.register = async function(){
    this.valid();

    if (this.errors.length > 0) return;
    
    this.contact = await ContactModel.create(this.body);
}

Contact.prototype.valid = function() {
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail');
  if (!this.body.name) this.errors.push('Name is required');
  if (!this.body.email && !this.body.telephone){
    this.errors.push('The contact needs at least: E-mail or Telephone.');
  } 


}

Contact.prototype.cleanUp = function(){
  for (const key in this.body) {
    if (typeof this.body[key] != 'string') {
      this.body[key] = '';
    }
  }


  this.body = {
    name: this.body.name,
    lastName: this.body.lastName,
    email: this.body.email,
    telephone: this.body.telephone,
  };
};

Contact.prototype.update = async function(id){
  if(typeof id !== 'string')return;
  this.valid();
  if (this.errors.length > 0) return;
  this.contact = await ContactModel.findByIdAndUpdate(id,this.body,{new:true});
}

Contact.searchById =  async function (id){
  if(typeof id !== 'string')return;
  const user = await ContactModel.findById(id);
  return user;
};

Contact.searchContacts =  async function (){
  const contacts = await ContactModel.find().sort({created_on: -1});
  return contacts;
}


Contact.delete =  async function (id){
  if(typeof id !== 'string')return;
  const contact = await ContactModel.findOneAndDelete({_id:id});
  return contact;
}




module.exports = Contact;
