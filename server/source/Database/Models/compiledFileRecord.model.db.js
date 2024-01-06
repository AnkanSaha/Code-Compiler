export default {
  FileName: {type: String, required: true, unique: true, index: true, lowercase: true},
  FileSize: {type: Number, required: true, index: false, min: 0},
  FilePath: {type: String, required: true, index: false},
  FileExtraPackages: {type: Array, required: false, index: false, default: []},
  sessionID: {type: String, required: true, index: true, unique: true},
  LanguageName: {type: String, required: true, index: true, lowercase: true},
  BuilderIP: {type: String, required: true, index: false},
  BuildTime: {type: Date, required: true, index: false, default: Date.now},
  BuildStatus: {type: String, required: true, index: false, default: 'Pending', enum: ['Pending', 'Success', 'Failed']},
};
