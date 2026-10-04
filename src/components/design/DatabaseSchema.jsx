import React, { useState } from "react";
import { Database, Key, Link2, Search, Table } from "lucide-react";

export function DatabaseSchema({ database }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!database || !database.tables) {
    return (
      <div className="p-8 text-center bg-[#0d121f] rounded-xl border border-slate-800 text-slate-400 text-sm">
        No database schema data available.
      </div>
    );
  }

  const filteredTables = database.tables.filter((tbl) =>
    tbl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tbl.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Database Architecture</span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            {database.databaseType || "MongoDB & Relational Data Models"}
          </h3>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter tables & fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Tables Grid */}
      <div className="space-y-4">
        {filteredTables.map((table) => (
          <div
            key={table.id || table.name}
            className="rounded-xl border border-slate-800 bg-[#0d121f] overflow-hidden"
          >
            {/* Table Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 bg-slate-900/60 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
                  <Table className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold font-mono text-white flex items-center gap-2">
                    <span>{table.name}</span>
                    <span className="text-[11px] font-sans font-normal text-slate-400">
                      ({table.fields?.length || 0} fields)
                    </span>
                  </h4>
                  {table.description && (
                    <p className="text-xs text-slate-400">{table.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Table Fields View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/30 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-5">Field Name</th>
                    <th className="py-2.5 px-4">Data Type</th>
                    <th className="py-2.5 px-4">Key / Constraint</th>
                    <th className="py-2.5 px-4">Nullable</th>
                    <th className="py-2.5 px-5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {(table.fields || []).map((field, fIdx) => (
                    <tr key={fIdx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-5 font-mono font-medium text-slate-200 flex items-center gap-2">
                        {field.isPrimaryKey && <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        {field.isForeignKey && <Link2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                        <span>{field.name}</span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-indigo-400 font-medium">
                        {field.type}
                      </td>
                      <td className="py-2.5 px-4">
                        {field.isPrimaryKey && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 text-amber-400 border border-amber-500/40">
                            PRIMARY KEY
                          </span>
                        )}
                        {field.isForeignKey && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-950/60 text-sky-400 border border-sky-500/40">
                            FK → {field.references || "relation"}
                          </span>
                        )}
                        {!field.isPrimaryKey && !field.isForeignKey && (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">
                        {field.isNullable ? "YES" : "NO"}
                      </td>
                      <td className="py-2.5 px-5 text-slate-400">
                        {field.description || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatabaseSchema;
