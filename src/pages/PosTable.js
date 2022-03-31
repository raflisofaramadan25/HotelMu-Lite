import Page from "./Page";
import TableApi from "../repositories/api/TableApi";
import tableView from "../templates/table.handlebars";
import tableItemView from "../templates/table-item.handlebars"
import $ from "jquery";
import BasketService from "../services/BasketService";
import TransactionService from "../services/TransactionService";
import BasketLocalStorage from "../repositories/localstorage/BasketLocalStorage";

class PosTable extends Page {
    constructor(params) {
        super(params)
    }

    async getTables() {
        try{
            let res = await TableApi.getAll();

            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    async action() {
        const dataTables = await this.getTables();
        const basketService = new BasketService();
        const transactionService = new TransactionService();

        $('.items-table').html(tableItemView({tables: dataTables}))

        $('.table-id').on('click', (e) => {
            let id = $(e.currentTarget).data('id')
            let name = $(e.currentTarget).data('name')
            let table = BasketLocalStorage.get('table')

            if(table){
                basketService.setTable({id: id, table_name: name});
            }else{
                transactionService.setTable(id)
            }
            window.history.back();
        })
    }

    render() {
        return tableView();
    }
}

export default PosTable;