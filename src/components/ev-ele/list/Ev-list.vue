<script>
const FLEX_WRAP = {display: 'flex', gap: '8px', 'flex-wrap': 'wrap'};
export default {
  name: 'ev-list',
  props: {
    //列信息配置
    columns: {
      type: Array, default: () => []
    },
    //面板标题
    title: {type: String, default: '面板'},
    //数据源，server | local
    source: {type: String, default: 'server'},
      //请求参数
      queryData:{type: Object, default: () => {}},
      queryParams: {type: Object, default: () => {}},
      queryPathData:{type: Object, default: () => {}},
    //---------------------- if source === server --------------------------------//
    //请求function
    queryFunction: {type: String},
      removeFunction: {type: String},
    //第一次加载是否立即请求
    immediate: {type: Boolean, default: true},
    //---------------------- if source === local  --------------------------------//
    defaultData: {type: Array, default: () => []},
    //是否带分页
    pagination: {type: Boolean, default: true},
    //---------------------- if pagination === true --------------------------------//
    //每页条数
    defaultPageSize: {type: Number, default: 20},
    //当前页数
    defaultPageNumber: {type: Number, default: 1},
    //可选每页条数
    pageSizeOption: {
      type: Array, default: function () {
        return [20, 50, 100]
      }
    },

    rowKey: {type: String, default: '_id'},

    // table的props
    titleFlag: {type: Boolean, default: true},
    cardFlag: {type: Boolean, default: true},
    cardClass: {type: String},

    // 斑马纹
    stripe: {type: Boolean, default: true},
    // 边框
    border: {type: Boolean, default: true},
    // 固定表头
    fixedHeader: {type: Boolean, default: false},
    headerHeight: {type: [Boolean, String], default: '50px'},

    // 选择
    selected: {type: String, default: 'multiple'},

    // 搜索框
    formItem: {type: Array, default: () => []},


    hideDetailButton: {type: Boolean, default: true}, // 显示详情按钮
    hideEditButton: {type: Boolean, default: true}, // 显示编辑按钮
    hideDeleteButton: {type: Boolean, default: true}, // 显示删除按钮
  },
  data() {
    return {
      pageSize: this.defaultPageSize,
      pageNumber: this.defaultPageNumber,
      // 选中元素
      currentRow: '',
      multipleSelection: [],
      list: [],
      total: 0,

      // 搜索条件  可以通过ref获取
      queryForm: {},

        searchSwitch: false,
    }
  },
  computed: {
    tableData() {
      if (this.source === 'server') {
        // 服务器数据
          return this.list;
      } else {
        // 本地数据
        if (this.pagination) {
          const num = this.pageSize * (this.pageNumber - 1) - 1;
            return this.defaultData.filter((data, i) => i > num && i <= num + this.pageSize);
        }
      }
      return this.defaultData;
    },
    tableTotal() {
      if (this.source === 'server') {
        return this.total;
      } else {
        return this.defaultData.length;
      }
    },
    // 默认查询条件  item的value
    defaultQueryForm() {
      return this.formItem.filter(item => ![undefined, null, ""].includes(item.value)).reduce((obj, item) => {
        obj[item.code] = item.value;
        return obj;
      }, {})
    },
  },
  watch:{
    pageSize(n, o){
      if(n !== o) {
        this.query();
      }
    },
    pageNumber(n,o){
      if(n !== o){
        this.query();
      }
    },
  },
  methods: {
    scopedSlots(createElement) {
      return {
        rowIndex: (record) => {
          const {$index} = record;
          return createElement('span', {}, $index + 1);
        },
        array: (record) => {
          let itemList = [];
          const {row, column} = record;
          if(Object.prototype.toString.call(row[column.property]) === '[object Array]') {
              row[column.property].forEach((item) => {
                  itemList.push(createElement('el-tag', {
                      props: {type: item && item.tagType || 'success'},
                  }, item && item.name || item));
              });
          } else {
              itemList = row[column.property];
          }

          return createElement('div', {
            style: FLEX_WRAP
          }, itemList);
        },
        password: ({row, column}) => {
          return createElement('span', row[column.property].replace(/./g, '*'));
        },
        localDict: ({row, column}, deploy) => {
          return createElement('span', this.$dict[deploy.dictCode][row[column.property]]);
        },
        boolean: ({row, column}) => {
          return createElement('ev-boolean', {props: {value: row[column.property]}});
        },
        html: ({row, column}) => {
          return createElement('span', {domProps: {innerHTML: row[column.property]}});
        },
        percent: ({row, column}) => {
          return createElement('span', row[column.property] ? row[column.property] + '%' : '');
        },
        number: ({row, column}) => {
          return createElement('div', {style: {textAlign: 'right'}}, row[column.property]);
        },
        objectEach: ({row, column}) => {
          let children = [];
          let field = row[column.property];
          if (field && typeof field === 'object') {
            for (let key in field) {
              children.push(createElement('div', `${key} = ${field[key]}`));
            }
          }

          return createElement('span', children);
        },
        operation: ({row}) => {
          let buttonList = [];
          if (!this.hideDetailButton) {
            buttonList.push(createElement('el-tooltip', {
              props: {effect: 'dark', content: '详情', placement: 'top-start'},
            }, [
              createElement('ev-button', {
                props: {round: true, size: 'mini', icon: "el-icon-search"},
                on: {
                  click: () => {
                    event && event.stopPropagation();
                    this.operation_detail(row)
                  }
                }
              })
            ]));
          }

          if (!this.hideEditButton) {
            buttonList.push(createElement('el-tooltip', {
              props: {effect: 'dark', content: '编辑', placement: 'top-start'},
            }, [
              createElement('ev-button', {
                props: {circle: true, size: 'mini', icon: 'el-icon-edit'},
                on: {
                  click: () => {
                    event && event.stopPropagation();
                    this.operation_edit(row)
                  }
                }
              })
            ]));
          }

          if (!this.hideDeleteButton) {
            buttonList.push(createElement('ev-button', {
              props: {title: '删除', size: 'mini', type: 'danger', icon: 'el-icon-delete'},
              on: {
                click: () => {
                  event && event.stopPropagation();
                  this.operation_removeOne(row);
                }
              }
            }));
          }
          return createElement('div', {
            class: 'ev-list-btn',
            style: FLEX_WRAP
          }, buttonList);
        },
      }
    },
    query: function (data) {
        this.load({...this.defaultQueryForm, ...this.queryForm, ...data});
    },
    load(data) {
        let queryParams = {};
        if (this.pagination) {
            queryParams.pageNumber = this.pageNumber - 1;
            queryParams.pageSize = this.pageSize;
        }
        queryParams = Object.assign(queryParams, this.queryParams);
        data = Object.assign(data, this.queryData);
      if (this.source === 'server') {
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        this.$store.dispatch(this.queryFunction,
            {data, params: queryParams, pathData: this.pathData}).then(({data, rows, code, errorCode, message, total}) => {
          if(code + '' === '0' || errorCode + '' === '0'){
            this.list = data.list || rows;
            this.total = total || data.total;
          } else {
            throw {message: message || '查询失败'};
          }
        }).catch(err => {
          this.$message.error(err.message);
        }).finally(() => {
          loading.close();
          loading = undefined;
        })
      }
    },
    // 单选
    setCurrent(row) {
      // 选中指定行
      this.$refs && this.$refs.list && this.$refs.list.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 多选
    toggleSelection(rows) {
      // 选中指定行
      if (rows) {
        rows.forEach(row => {
          this.$refs.list.toggleRowSelection(row);
        });
      } else {
        this.$refs.list.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('update:selectedRowKeys', val.map(v => v[this.rowKey]));
      this.$emit('update:selectedRows', val);
      this.$emit('checkedChange', val.map(v => v[this.rowKey]), val);
    },

    onSelectChange(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys, selectedRows);
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handlePaginationCurrentChange(val) {
        this.pageNumber = val;
    },

    operation_edit(row) {
        this.$emit('edit', row)
    },
    operation_detail(row) {
      this.$emit('detail', row)
    },
    operation_removeOne(row) {
        if(this.removeFunction) {
            // todo 结合后台传参,传参做对应的修改。
            this.$store.dispatch(this.removeFunction, {pathData: {id: row[this.rowKey]}}).then(() => {
                this.$message.success('删除成功');
                this.query();
            });
        }
      this.$emit('remove', row)
    },
  },
  created(){
    this.queryForm = {...this.defaultQueryForm, ...this.queryForm};
    if(this.immediate) {
      this.query();
    }
  },
  render(createElement) {
    /* ------ table ------ */
    /* ------ search ------ */
    let queryForm = this.$slots.queryForm;
    if(!queryForm && Object.prototype.toString.call(this.formItem) === '[object Array]' && this.formItem.length) {
      queryForm = createElement('div', {
          class: this.searchSwitch ? 'ev-accordion up' : 'ev-accordion down',
      }, [createElement('ev-form', {
          props: {
              items: this.formItem,
          },
          on: {
              query: (val) => {
                  this.load(val);
                  this.queryForm = val;
              },
              blur: () => {
                  // 失去焦点
              },
              change: (val) => {
                  this.queryForm = val;
              }
          },
      }, this.$slots.queryFormTailPlug || null), createElement('i', {
          class: this.searchSwitch ? 'el-icon-arrow-down search-switch' : 'el-icon-arrow-up search-switch',
          on: {
              click: () => {
                  this.searchSwitch = !this.searchSwitch;
              }
          },
      } )]);
    }
    /* ------ search end ------ */
    const card = {
      name: 'ev-card',
      param: {
        class: 'ev-list',
        props: {
          title: this.title,
          titleFlag: this.titleFlag,
          cardFlag: this.cardFlag,
          cardClass: this.cardClass,
        },
        directives: [
          {
            name: 'loading',
            value: this.$store.state.loading,
          }
        ],
      },
      children: [
        createElement('template', {slot: 'extra'}, this.$slots.extra),
        queryForm
      ]
    };
      const tableProps = {
      ref: 'list',
      data: this.tableData,
      stripe: this.stripe,
      height: '100%',
    };
    // 是否固定表头
    if (this.fixedHeader) {
      tableProps['max-height'] = this.headerHeight;
    }
    // 是否显示边框
    if (this.border) {
      tableProps.border = this.border;
    }
    const table = {
      name: 'el-table',
      param: {
        class: 'card-table',
        props: tableProps,
        on: {
          'current-change': this.handleCurrentChange,
          'selection-change': this.handleSelectionChange,
        },
      },
      children: []
    };
    if (this.selected === 'single') {
      // 单选 选中行高亮
      table.param.props['highlight-current-row'] = true;
    } else if (this.selected === 'multiple') {
      // 多选
      table.children.push(createElement('el-table-column', {
        props: {width: '50', type: 'selection'}
      }, []));
    }
    this.columns.forEach(column => {
        const param = {
        props: {
          prop: column.code || null,
          label: column.name,
          width: column.width || null,
          fixed: column.fixed || false,
        },
        scopedSlots: {},
      };
      if (column.fixed) {
        param.props.fixed = column.fixed;
      }
      // 列数据 有自定义使用自定义，没自定义使用默认
      if (column.scopedSlots) {
        param.scopedSlots.default = this.$scopedSlots[column.scopedSlots]
            || this.scopedSlots(createElement)[column.scopedSlots] && ((val) => this.scopedSlots(createElement)[column.scopedSlots](val, column));
      }
      // 多级表头
      const children = column.children && column.children.map(item => {
        return createElement('el-table-column', {
          props: {
            prop: item.code,
            label: item.name,
            width: item.width || null,
          }
        }, [])
      }) || [];
      table.children.push(createElement('el-table-column', param, children));
    });
    card.children.push(createElement(table.name, table.param, table.children));
    /* ------ table end ------ */

    /* ------ pagination ------ */
    // 分页
    if (this.pagination) {
      let pagination = {
        name: 'el-pagination',
        param: {
          style: {display: 'flex', 'justify-content': 'center', 'align-items': 'center', 'height': '42px'},
          props: {
            pageSizes: this.pageSizeOption,
            pageSize: this.defaultPageSize,
            currentPage: this.pageNumber,
            background: true,
            total: this.tableTotal,
            layout: "total, prev, pager, next, sizes",
          },
          on: {
            'current-change': this.handlePaginationCurrentChange,
            'size-change': this.handleSizeChange,
          },
        },
      }
      card.children.push(createElement(pagination.name, pagination.param, []));
    }
    /* ------ pagination end ------ */
    return createElement(card.name, card.param, card.children);
  }
}
</script>
<style lang="less" scoped>
.ev-list {
  height: 100%;

  /deep/ .el-button--primary,
  /deep/ .el-button--success,
  /deep/ .el-button--info,
  /deep/ .el-button--warning,
  /deep/ .el-button--danger {
    [class^="el-icon"], span {
      color: white;
    }
  }

  .ev-list-btn {

    /deep/ .el-button--mini, /deep/ .el-button--mini.is-round {
      padding: 7px;
    }

    /deep/ .el-button.is-round {
      border-radius: 7px;
    }

    /deep/ .el-button + .el-button {
      margin-left: 0;
    }
  }

  /deep/ .el-card {
    height: 100%;
  }
  /deep/ .el-card__body {
    height: calc(100% - 58px);
      box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /deep/ .el-form-item {

    .el-select {
      .el-tag.el-tag--info {
        overflow: hidden;
      }
    }
  }

  /deep/ .el-table {
    flex: 1;
    display: flex;
    flex-direction:column;

    tr {
      td, th {
        padding: 6px 0;
      }

      th.gutter {
        display: table-cell !important;
      }
    }

    .el-button--text{
      color: #409EFF;
    }



    .el-table--scrollable-y .el-table__body-wrapper {
      overflow-y: auto;
    }

    .el-table--scrollable-x .el-table__body-wrapper {
      overflow-x: auto;
    }
    .el-table__body-wrapper::-webkit-scrollbar { /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 10px;
    }

    .el-table__body-wrapper::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #a3a3a3;
    }

    .el-table__body-wrapper::-webkit-scrollbar-track { /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #EDEDED;
    }
  }

  /deep/ .el-table::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }

  /deep/ .el-table::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #a3a3a3;
  }

  /deep/ .el-table::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #EDEDED;
  }

    .ev-accordion{
        width: 100%;
        max-height: 500px;
        position: relative;
        .search-switch{
            position: absolute;
            right: 8px;
            top: 16px;
            font-size: 24px;
        }
        .ev-form-border{
            max-height: 500px;
        }
    }

    .ev-accordion.up{
        max-height: 80px;
        transition: all .3s;

        .ev-form-border{
            overflow: hidden;
            max-height: 40px;
            transition: all .3s;
        }
    }
    .ev-accordion.down{
        max-height: 500px;
        transition: all .3s;
    }
}
</style>
