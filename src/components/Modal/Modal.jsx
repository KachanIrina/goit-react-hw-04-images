import { Component } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEsc);
  }

  onCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseByOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImg } = this.props;
    return (
      <div className={css.Overlay} onClick={this.onCloseByOverlay}>
        <div className={css.Modal}>
          <img src={largeImg} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: propTypes.func,
};
