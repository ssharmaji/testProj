import * as React from 'react';

const FormLayout = () => {
  return (
    <form className="custom-from">
      <div className="form-group">
        <label>From label</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>From label</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <div className="check-group">
          <label>From label</label>
          <input type="checkbox" className="form-control" />
        </div>
      </div>

      <div className="form-group">
        <div className="check-group">
          <label>From label</label>
          <input type="radio" className="form-control" />
        </div>
      </div>
      <div className="form-group">
        <label>From label</label>
        <select className="from-control">
          <option>1</option>
          <option>2</option>
        </select>
      </div>
      <div className="form-group">
        <label>From label</label>
        <textarea className="from-control"></textarea>
      </div>
    </form>
  );
};

export default FormLayout;
