import postgresqlFactory from './postgresql.js'

async function cockroachdbDriverFactory () {
  const PostgresqlDriver = await postgresqlFactory.call(this)

  class CockroachdbDriver extends PostgresqlDriver {
    constructor (plugin, options) {
      super(plugin)
      this.dialect = 'cockroachdb'
    }

    async sanitizeConnection (item) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 26257
      item.user = item.user ?? 'root'
      item.host = item.host ?? '127.0.0.1'
    }
  }

  return CockroachdbDriver
}

export default cockroachdbDriverFactory
