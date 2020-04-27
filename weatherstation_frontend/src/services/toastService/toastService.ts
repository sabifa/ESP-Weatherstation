import Vue from 'vue';

const toastService = {
  showError(message: string): void {
    Vue.$toast.error(message);
  },
  showSuccess(message: string): void {
    Vue.$toast.success(message);
  },
};

export default toastService;
