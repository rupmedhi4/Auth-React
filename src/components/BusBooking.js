import React, { useState } from 'react';
import './BusBooking.css';

const BusBooking = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', bus: 'Bus 1' });
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editIndex, setEditIndex] = useState(null); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = () => {
    if (form.name && form.email && form.phone) {
      setBookings([...bookings, form]);
      setForm({ name: '', email: '', phone: '', bus: 'Bus 1' });
    }
  };

  const handleUpdate = () => {
    if (editIndex !== null && form.name && form.email && form.phone) {
      const updated = [...bookings];
      updated[editIndex] = form;
      setBookings(updated);
      setForm({ name: '', email: '', phone: '', bus: 'Bus 1' });
      setEditIndex(null);
    }
  };

  const handleDelete = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    if (editIndex === index) {
      setForm({ name: '', email: '', phone: '', bus: 'Bus 1' });
      setEditIndex(null);
    }
  };

  const handleEdit = (index) => {
    setForm(bookings[index]);
    setEditIndex(index);
  };

  const filteredBookings =
    filter === 'All' ? bookings : bookings.filter((b) => b.bus === filter);

  return (
    <div className="container">
      <h1 className="heading">🚌 Bus Booking</h1>

      <div className="form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="input"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="input"
        />
        <select
          name="bus"
          value={form.bus}
          onChange={handleChange}
          className="select"
        >
          <option>Bus 1</option>
          <option>Bus 2</option>
          <option>Bus 3</option>
        </select>

        {editIndex !== null ? (
          <button onClick={handleUpdate} className="button">
            Update
          </button>
        ) : (
          <button onClick={handleBook} className="button">
            Book
          </button>
        )}
      </div>

      <div className="filter-container">
        <h2>📋 Bookings</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select"
        >
          <option>All</option>
          <option>Bus 1</option>
          <option>Bus 2</option>
          <option>Bus 3</option>
        </select>
      </div>

      {filteredBookings.map((b, index) => (
        <div key={index} className="booking-card">
          <div>
            <p>
              <strong>{b.name}</strong> | {b.email} | {b.phone} | {b.bus}
            </p>
          </div>
          <div className="actions">
            <button onClick={() => handleDelete(index)} className="delete">
              Delete
            </button>
            <button onClick={() => handleEdit(index)} className="edit">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusBooking;
