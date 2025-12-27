async function postgresqlDriverFactory () {
  const { KnexDriver } = this.app.doboKnex.baseClass

  class PostgresqlDriver extends KnexDriver {
    constructor (plugin, options) {
      super(plugin)
      this.dialect = 'postgres'
      this.adapter = 'pg'
      this.support.returning = true
    }

    async sanitizeConnection (item) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 5432
      item.user = item.user ?? 'postgres'
      item.host = item.host ?? '127.0.0.1'
      item.database = item.database ?? 'postgres'
    }

    _reformHistogram ({ type, item, group, aggregates, field }) {
      const aggs = []
      for (const agg of aggregates) {
        aggs.push(`${agg}(${agg === 'count' ? '*' : `"${field}"`}) as ${agg}`)
      }
      switch (type) {
        case 'daily': {
          item.sql = item.sql.replace('*', `to_char("${group}", 'yyyy-mm-dd') as date, ${aggs.join(', ')}`)
          item.sql = item.sql.replace('limit ', 'group by date limit ')
          break
        }
        case 'monthly': {
          item.sql = item.sql.replace('*', `to_char("${group}", 'yyyy-mm') as month, ${aggs.join(', ')}`)
          item.sql = item.sql.replace('limit ', 'group by month limit ')
          break
        }
        case 'annually': {
          item.sql = item.sql.replace('*', `to_char("${group}", 'yyyy') as year, ${aggs.join(', ')}`)
          item.sql = item.sql.replace('limit ', 'group by year limit ')
          break
        }
      }
    }

    async getRawResult (instance, item) {
      item = item ?? instance.toSQL().toNative()
      const result = (await instance.client.raw(item.sql, item.bindings)) ?? []
      return result.rows
    }
  }

  return PostgresqlDriver
}

export default postgresqlDriverFactory
