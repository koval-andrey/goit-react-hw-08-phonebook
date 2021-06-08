import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Filter.module.css";
import * as actions from "../../redux/phonebook-action";
import { getFilter } from "../../redux/phonebook-selector";

const Filter = ({ filter, onChange }) => (
  <div className={styles.wrapper}>
    <label className={styles.label}>
      Search by Name
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={onChange}
      />
    </label>
  </div>
);
Filter.defaultProps = {
  filter: "",
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filter: getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (event) => dispatch(actions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
