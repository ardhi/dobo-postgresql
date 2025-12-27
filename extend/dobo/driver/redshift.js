import postgresqlFactory from './postgresql.js'

async function redshiftDriverFactory () {
  const PostgresqlDriver = await postgresqlFactory.call(this)

  class RedshiftDriver extends PostgresqlDriver {
    constructor (plugin, options) {
      super(plugin)
      this.dialect = 'redshift'
    }

    async sanitizeConnection (item) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 5439
    }
  }

  return RedshiftDriver
}

export default redshiftDriverFactory
