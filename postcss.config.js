module.exports = {
  plugins: [
    // eslint-disable-next-line
    require("tailwindcss")("./tailwind/tailwind.config.js"),
    // eslint-disable-next-line
    require("autoprefixer")
  ],
}
