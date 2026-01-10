import postgresqlFactory from './postgresql.js'

async function cockroachdbDriverFactory () {
  const DoboPostgresqlDriver = this.app.baseClass.DoboPostgresqlDriver ?? (await postgresqlFactory.call(this))

  class DoboCockroachdbDriver extends DoboPostgresqlDriver {
    constructor (plugin, name, options) {
      super(plugin, name, options)
      this.dialect = 'cockroachdb'
    }

    async sanitizeConnection (item) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 26257
      item.user = item.user ?? 'root'
      item.host = item.host ?? '127.0.0.1'
    }
  }

  this.app.baseClass.DoboCockroachdbDriver = DoboCockroachdbDriver
  return DoboCockroachdbDriver
}

export default cockroachdbDriverFactory
