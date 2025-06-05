<template>
  <div>
    <h3>File Upload with Validation</h3>
    <input type="file" @change="handleFileChange" />
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="fileName">Selected file: {{ fileName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: '',
      fileName: '',
      maxFileSize: 2 * 1024 * 1024, // 2MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    };
  },
  methods: {
    handleFileChange(event) {
      this.errorMessage = '';
      this.fileName = '';
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      // Validate file type
      if (!this.allowedTypes.includes(file.type)) {
        this.errorMessage = 'Invalid file type. Only JPG, PNG, and GIF are allowed.';
        event.target.value = null; // Clear the input
        return;
      }

      // Validate file size
      if (file.size > this.maxFileSize) {
        this.errorMessage = 'File size exceeds 2MB limit.';
        event.target.value = null; // Clear the input
        return;
      }

      this.fileName = file.name;

      // Proceed with further processing, e.g., upload
      // this.uploadFile(file);
    },
    // uploadFile(file) {
    //   // Implement your upload logic here
    // }
  },
};
</script>

<style scoped>
/* Add any styles if needed */
</style>
