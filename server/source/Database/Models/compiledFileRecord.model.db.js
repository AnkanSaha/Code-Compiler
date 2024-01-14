export default {
  FileName: {type: String, required: true, unique: true, index: true},
  FileSize: {type: Number, required: true, index: false, min: 0},
  FilePath: {type: String, required: true, index: false},
  CompilerOutputFile: {type: String, required: false, index: false, default: ''},
  FileExtraPackages: {type: Array, required: false, index: false, default: []},
  LanguageType: {type: String, required: false, index: true, lowercase: true, enum: ['interpreted', 'compiled']},
  sessionID: {type: String, required: true, index: true, unique: true},
  LanguageName: {type: String, required: true, index: true, lowercase: true},
  BuilderIP: {type: String, required: true, index: false},
  BuildTime: {type: Date, required: true, index: false, default: Date.now},
  BuildStatus: {type: String, required: true, index: false, default: 'Pending', enum: ['Pending', 'Success', 'Failed']},
};
