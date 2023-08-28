module.exports = {
    FileName: {type: String, required: true, unique: true},
    BuildTime: {type: Date, required: true, default: Date.now},
    BuildSession: {type: String, required: true, unique: true},
    ProgrammingLanguage: {type: String, required: true, index: true},
    FileSize: {type: Number, required: true, index: true},
}