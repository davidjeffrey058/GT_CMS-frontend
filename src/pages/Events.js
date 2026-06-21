import { useState, useEffect } from "react";
import ErrorComponent from "../components/errorComponent";
import { setPageTitle } from "../util/methods";
// import "bootstrap/dist/css/bootstrap.min.css";

const Events = () => {
    useEffect(() => {
        setPageTitle("Events & Services");
    }, []);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Sunday Worship Service",
      type: "Service",
      date: "2025-09-15",
      time: "09:00",
      venue: "Main Auditorium",
      roles: ["Pastor John", "Choir Team A", "Usher Group 1"],
      reminder: true,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    type: "Service",
    date: "",
    time: "",
    venue: "",
    roles: "",
    reminder: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      ...formData,
      roles: formData.roles
        .split(",")
        .map((role) => role.trim())
        .filter(Boolean),
    };

    setEvents([...events, newEvent]);

    setFormData({
      title: "",
      type: "Service",
      date: "",
      time: "",
      venue: "",
      roles: "",
      reminder: true,
    });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="container-fluid py-4">
        {/* Page Header */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div className="">
              <h2 className="fw-bold mb-1">
                Event & Service Management
              </h2>
              <p className="text-muted mb-0">
                Manage church services, crusades, meetings, role assignments,
                and event reminders.
              </p>
            </div>
            <button class="btn btn-primary d-flex gap-1"
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#staticBackdrop" 
            aria-controls="staticBackdrop">
                <span className="material-symbols-outlined">
                calendar_add_on
                </span>
                Create Event
            </button>
          </div>
        </div>

        {/* Event List */}
        <div className="">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Scheduled Events</h5>
              <span className="badge bg-primary">
                {`${events.length} Event${events.length >= 2 ? 's' : ''}`}
              </span>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Event</th>
                      <th>Type</th>
                      <th>Schedule</th>
                      <th>Venue</th>
                      <th>Assigned Roles</th>
                      <th>Reminder</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.length > 0 ? (
                      events.map((event) => (
                        <tr key={event.id}>
                          <td>
                            <strong>{event.title}</strong>
                          </td>

                          <td>
                            <span className="badge bg-info text-dark">
                              {event.type}
                            </span>
                          </td>

                          <td>
                            <div>{event.date}</div>
                            <small className="text-muted">
                              {event.time}
                            </small>
                          </td>

                          <td>{event.venue}</td>

                          <td>
                            {event.roles.map((role, index) => (
                              <span
                                key={index}
                                className="badge bg-secondary me-1 mb-1"
                              >
                                {role}
                              </span>
                            ))}
                          </td>

                          <td>
                            {event.reminder ? (
                              <span className="badge bg-success">
                                Enabled
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                Disabled
                              </span>
                            )}
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteEvent(event.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-4 text-muted"
                        >
                          <ErrorComponent
                          errorMessage={'No events Scheduled'}
                          image="delete.png"
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Calendar Placeholder */}
          <div className="card shadow-sm mt-4">
            <div className="card-header">
              <h5 className="mb-0">Event Calendar</h5>
            </div>

            <div className="card-body text-center">
              <div className="p-5 border rounded bg-light">
                <h6 className="text-muted">
                  Calendar Integration Area
                </h6>
                <p className="mb-0">
                  Integrate FullCalendar or React Big Calendar here
                  for monthly, weekly, and daily event scheduling.
                </p>
              </div>
            </div>
          </div>

          {/* Notification Summary */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card border-success">
                <div className="card-body">
                  <h6 className="text-success">Active Reminders</h6>
                  <h3>
                    {
                      events.filter((e) => e.reminder)
                        .length
                    }
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-primary">
                <div className="card-body">
                  <h6 className="text-primary">
                    Upcoming Events
                  </h6>
                  <h3>{events.length}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-warning">
                <div className="card-body">
                  <h6 className="text-warning">
                    Assigned Ministries
                  </h6>
                  <h3>
                    {[
                      ...new Set(
                        events.flatMap((e) => e.roles)
                      ),
                    ].length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      

        {/* Offcanvas for Event Form */}
        <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" 
        id="staticBackdrop" 
        aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header">
                {/* <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5> */}
                <button type="button" 
                className="btn-close" 
                data-bs-dismiss="offcanvas" 
                aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {/* Event Form */}
                <div className=" mb-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Create New Event</h5>
                    </div>

                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <label className="form-label">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="mb-3">
                        <label className="form-label">Event Type</label>
                        <select
                            name="type"
                            className="form-select"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option>Service</option>
                            <option>Crusade</option>
                            <option>Prayer Meeting</option>
                            <option>Leadership Meeting</option>
                            <option>Youth Program</option>
                        </select>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Date</label>
                            <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Time</label>
                            <input
                            type="time"
                            name="time"
                            className="form-control"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>

                        <div className="mb-3">
                        <label className="form-label">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            className="form-control"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="Main Auditorium"
                        />
                        </div>

                        <div className="mb-3">
                        <label className="form-label">
                            Assign Roles
                        </label>
                        <textarea
                            name="roles"
                            rows="3"
                            className="form-control"
                            value={formData.roles}
                            onChange={handleChange}
                            placeholder="Pastor John, Choir Team A, Usher Group 1"
                        />
                        <small className="text-muted">
                            Separate roles with commas.
                        </small>
                        </div>

                        <div className="form-check form-switch mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="reminder"
                            checked={formData.reminder}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">
                            Enable Reminder Notifications
                        </label>
                        </div>

                        <button className="btn btn-primary w-100">
                        Create Event
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Events;