import Swal from 'sweetalert2';
import { ReactNode } from 'react';

// Theme colors matching VehicleHub design
const THEME = {
  background: '#1a1d21',
  text: '#ffffff',
  accent: '#17bfcf',
  border: '#2d3339',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
};

// Base SweetAlert configuration
const baseConfig = {
  background: THEME.background,
  color: THEME.text,
  confirmButtonColor: THEME.accent,
  cancelButtonColor: THEME.border,
  customClass: {
    popup: 'swal-custom-popup',
    title: 'swal-custom-title',
    htmlContainer: 'swal-custom-html',
    confirmButton: 'swal-custom-confirm',
    cancelButton: 'swal-custom-cancel',
  },
  showClass: {
    popup: 'swal-show-animation',
  },
  hideClass: {
    popup: 'swal-hide-animation',
  },
};

export const useSweetAlert = () => {
  /**
   * Show success notification
   */
  const showSuccess = (title: string, message?: string) => {
    return Swal.fire({
      ...baseConfig,
      icon: 'success',
      title,
      text: message,
      iconColor: THEME.success,
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true,
    });
  };

  /**
   * Show error notification
   */
  const showError = (title: string, message?: string) => {
    return Swal.fire({
      ...baseConfig,
      icon: 'error',
      title,
      text: message,
      iconColor: THEME.error,
      confirmButtonText: 'OK',
    });
  };

  /**
   * Show warning notification
   */
  const showWarning = (title: string, message?: string) => {
    return Swal.fire({
      ...baseConfig,
      icon: 'warning',
      title,
      text: message,
      iconColor: THEME.warning,
      confirmButtonText: 'OK',
    });
  };

  /**
   * Show info notification
   */
  const showInfo = (title: string, message?: string) => {
    return Swal.fire({
      ...baseConfig,
      icon: 'info',
      title,
      text: message,
      iconColor: THEME.accent,
      confirmButtonText: 'OK',
    });
  };

  /**
   * Show confirmation dialog
   */
  const showConfirm = async (
    title: string,
    message?: string,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ) => {
    const result = await Swal.fire({
      ...baseConfig,
      icon: 'question',
      title,
      text: message,
      iconColor: THEME.accent,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    });

    return result.isConfirmed;
  };

  /**
   * Show loading state with custom car loader
   */
  const showLoading = (title: string = 'Loading...', message?: string) => {
    Swal.fire({
      ...baseConfig,
      title,
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      html: `
        <div class="swal-car-loader-wrapper">
          <div class="car-loader-container">
            <div class="car-container">
              <div class="car"></div>
              <div class="front-part"></div>
              <div class="front-part2"></div>
              <div class="front-part3"></div>
              <div class="bottom-part"></div>
              <div class="wheel-container wheel-container1"></div>
              <div class="wheel-container wheel-container2"></div>
              <div class="wheel-back"></div>
              <div class="window"></div>
              <div class="window2"></div>
              <div class="window3"></div>
              <div class="details"></div>
              <div class="details2"></div>
              <div class="details3"></div>
              <div class="details4"></div>
              <div class="details5"></div>
              <div class="bumper"></div>
              <div class="bumper2"></div>
              <div class="head-lights"></div>
              <div class="tail-lights"></div>
              <div class="extra-lighting-details"></div>
              <div class="extra-lighting-details2"></div>
              <div class="extra-lighting-details3"></div>
            </div>
            <div class="container-wheel1">
              <div class="wheel-break"></div>
              <div class="wheel-ring wheel-ring1">
                <div class="wheel-center"></div>
                <div class="wheel-center2"></div>
                <div class="wheel-ring-stick"></div>
                <div class="wheel-ring-stick wheel-ring-stick2"></div>
                <div class="wheel-ring-stick wheel-ring-stick3"></div>
                <div class="wheel-ring-stick wheel-ring-stick4"></div>
                <div class="wheel-ring-stick wheel-ring-stick5"></div>
                <div class="wheel-logo"></div>
              </div>
            </div>
            <div class="container-wheel2">
              <div class="wheel-break2"></div>
              <div class="wheel-ring2 wheel-ring">
                <div class="wheel-center"></div>
                <div class="wheel-center2"></div>
                <div class="wheel-ring-stick"></div>
                <div class="wheel-ring-stick wheel-ring-stick2"></div>
                <div class="wheel-ring-stick wheel-ring-stick3"></div>
                <div class="wheel-ring-stick wheel-ring-stick4"></div>
                <div class="wheel-ring-stick wheel-ring-stick5"></div>
                <div class="wheel-logo"></div>
              </div>
            </div>
            <div class="street">
              <div class="line"></div>
              <div class="obstacles"></div>
            </div>
          </div>
        </div>
      `,
    });
  };

  /**
   * Close loading state
   */
  const closeLoading = () => {
    Swal.close();
  };

  /**
   * Show toast notification (bottom-right corner)
   */
  const showToast = (
    icon: 'success' | 'error' | 'warning' | 'info',
    title: string
  ) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: THEME.background,
      color: THEME.text,
      iconColor:
        icon === 'success'
          ? THEME.success
          : icon === 'error'
          ? THEME.error
          : icon === 'warning'
          ? THEME.warning
          : THEME.accent,
      customClass: {
        popup: 'swal-toast-popup',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    return Toast.fire({
      icon,
      title,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showLoading,
    closeLoading,
    showToast,
  };
};
