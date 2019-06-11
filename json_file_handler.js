const fs = require('fs')
const util = require('util')
const _ = require('lodash')
const logger = require('../config/script_logger')

const readFileAsync = util.promisify(fs.readFile)

const JsonFileHandler = () => {
  /**
   * append to array in a json file, if the file doesn't exist create a new file with the provided path
   *
   * @param {String} file path to the file
   * @param {Array} itemsList items array to add
   * @param {Object} options fs write options
   * @returns {Promise<Boolean>}
   */
  const appendToJsonArrayAsync = async (file, itemsList, options) => {
    // a+ flag to read in a file and create it if doesn't exist
    const jsonFile = await readFileAsync(file, { flag: 'a+' })
    let savedInFileArray = []

    try {
      savedInFileArray = JSON.parse(jsonFile)
    } catch (error) {
      logger.info(`invalid json parsing for file: ${file}`)
    }

    if (_.isNil(savedInFileArray) || Array.isArray(itemsList)) {
      const dataStringfied = JSON.stringify(
        [...savedInFileArray, ...itemsList],
        null,
        4
      )
      fs.writeFileSync(file, dataStringfied, options)
      return true
    }
    return false
  }

  return { appendToJsonArrayAsync }
}

module.exports = JsonFileHandler()
