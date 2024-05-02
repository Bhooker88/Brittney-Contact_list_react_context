import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

export const ContactCard = (props) => {
  const [state, setState] = useState({
    //initialize state here
  });

  return (
    <li className="list-group-item">
      <div className="row w-100">
        <div className="col-12 col-sm-6 col-md-3 px-0">
          <img
            src={
              "https://raw.githubusercontent.com/breatheco-de/exercise-contact-list-context/master/src/img/m101.jpg"
            }
            alt="Mike Anamendolla"
            className="rounded-circle mx-auto d-block img-fluid"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
          <div className=" float-right">
            <button className="btn" onClick={() => props.onEdit()}>
              <i className="fas fa-pencil-alt mr-3" />
            </button>
            <button className="btn" onClick={() => props.onDelete()}>
              <i className="fas fa-trash-alt" />
            </button>
          </div>
          <label className="name lead">
            {props.contact && props.contact.name}
          </label>
          <br />
          <i className="fas fa-map-marker-alt text-muted mr-3" />
          <span className="text-muted">
            {props.contact && props.contact.address}
          </span>
          <br />
          <span
            className="fa fa-phone fa-fw text-muted mr-3"
            data-toggle="tooltip"
            title=""
            data-original-title="(870) 288-4149"
          />
          <span className="text-muted small">
            {props.contact && props.contact.phone}
          </span>
          <br />
          <span
            className="fa fa-envelope fa-fw text-muted mr-3"
            data-toggle="tooltip"
            data-original-title=""
            title=""
          />
          <span className="text-muted small text-truncate">
            {props.contact && props.contact.email}
          </span>
        </div>
      </div>
    </li>
  );
};

ContactCard.propTypes = {
  history: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  contact: PropTypes.object,
};

ContactCard.defaultProps = {
  onDelete: null,
  onEdit: null,
  contact: null,
};
