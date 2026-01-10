import postgresqlFactory from './postgresql.js'

async function redshiftDriverFactory () {
  const DoboPostgresqlDriver = this.app.baseClass.DoboPostgresqlDriver ?? (await postgresqlFactory.call(this))

  class DoboRedshiftDriver extends DoboPostgresqlDriver {
    constructor (plugin, name, options) {
      super(plugin, name, options)
      this.dialect = 'redshift'
    }

    async sanitizeConnection (item) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 5439
    }
  }

  this.app.baseClass.DoboRedshiftDriver = DoboRedshiftDriver
  return DoboRedshiftDriver
}

export default redshiftDriverFactory
