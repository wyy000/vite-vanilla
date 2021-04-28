export const d3Data = ['2345', '1441', '754']

export const menuList = [
  {name: 'chart', path: 'chart.html'},
  {name: 'createBoard', path: 'createBoard.html', active: true},
  {name: 'customerGroup', path: 'customerGroup.html'},
  {name: 'd3', path: 'd3.html'},
  {name: 'input', path: 'input.html'},
  {name: 'table', path: 'table.html'},
  {name: 'tableSort', path: 'tableSort.html'},
  {name: 'tree', path: 'tree.html'},
  {name: 'search-select', path: 'search-select.html'},
  {name: 'select', path: 'select.html'},
  {name: 'radio', path: 'radio.html'},
]

export const tableData = Array.from({length: 20}).map((it, idx) => ({
  id: Math.random(),
  age: parseInt(String(Math.random() * 100)),
  count: parseInt(String(Math.random() * 2000)),
  time: Date.now() + idx,
}))

export const treeData = Array.from({length: 6}).map((it, idx) => ({
  num: Math.random().toString().substr(2),
  pid: 0,
  id: idx + 1,
})).concat(Array.from({length: 20}).map((it, idx) => ({
  num: Math.random().toString().substr(2),
  pid: Math.ceil(Math.random() * 5),
  id: idx + 6,
  state: idx === 2 ? 'selected' : 'checked',
})))

export const userColumns = [
  {title: '客群', data: 'cname', sort: true},
  {title: '客群ID', data: 'id'},
  // {title: '人数', data: 'user_count', sort: true},
  {title: '时间', data: 'create_time'},
  {title: '创建者', data: 'user_name'},
  // {title: '操作', data: 'operation'},
]

export const userGroups = [{"id":1466,"name":"user_group_1","cname":"最近七天购买理财成功","user_name":"总部管理员","user_id":3,"create_time":"2020-03-31 15:00:31","data_type":"BOOL","unit":"DAY","source_type":2,"is_routine":false,"status":"RUNNING","cron":"0 0 0 * * ? *","app_push_list":[],"sql":"SELECT  `e`.`user_id` as `user_id` ,MAX(`e`.`distinct_id`) AS distinct_id\n\tFROM (\n\tSELECT  `d`.`user_id` as `user_id` , `d`.`distinct_id` as `distinct_id` \n\t\tFROM (\n\t\tSELECT STRAIGHT_JOIN  `c`.`finfo` as `finfo` , `c`.`distinct_id` as `distinct_id` , `c`.`user_id` as `user_id` , `b`.`p_province` as `byInfo` \n\t\t\tFROM (\n\t\t\tSELECT /* SA_SCAN_MODE_MERGE_ALL */funnel_user_by_day( 6, 604800, \u00272020-03-31 00:00:00\u0027, `a`.`funnel_step_id`, time, \u00272|1|-1,-1\u0027) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS finfo,funnel_info_parameter(`a`.`distinct_id`, 0) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS distinct_id,funnel_info_parameter(`a`.`user_id`, 1) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS user_id\n\t\t\t\tFROM (SELECT *,CASE WHEN   (`a`.`event_id` \u003d 1880) THEN 1 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1876) THEN 2 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1879) THEN 4 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1904) THEN 8 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1865) THEN 16 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1887) THEN 32 ELSE 0 END AS funnel_step_id FROM event_external_view_p22 a) a\n\t\t\t\tWHERE (`a`.`day` BETWEEN 18323 AND 18352) AND `a`.`event_bucket` IN (0,4,5,6,7,9) AND (  (  (`a`.`event_id` \u003d 1880)) OR (  (`a`.`event_id` \u003d 1876)) OR (  (`a`.`event_id` \u003d 1879)) OR (  (`a`.`event_id` \u003d 1904)) OR (  (`a`.`event_id` \u003d 1865)) OR (  (`a`.`event_id` \u003d 1887)))) c\n\t\t\tLEFT JOIN /* +BROADCAST */ \n\t\tprofile_view_p22 b\n\t\t\tON  `c`.`user_id` \u003d `b`.`id`) d\n\t\tWHERE (`d`.`byInfo` \u003d \u0027山西\u0027) AND (`d`.`finfo` is not null)) e\n\tGROUP BY 1","failed_partition_count":0,"last_succeed_partition":{"base_time":"2020-05-08 00:00:00","start_time":"2020-05-08 11:25:36","finished_time":"2020-05-08 11:26:00","user_count":3996,"status":"SUCCEED"},"last_partition_info":{"base_time":"2020-05-08 00:00:00","start_time":"2020-05-08 11:25:36","finished_time":"2020-05-08 11:26:00","user_count":3996,"status":"SUCCEED","failed_message":{},"next_partition_base_time":"2020-05-09 00:00:00"},"query_url":"/funnel/#from_date\u003d2020-03-02\u0026to_date\u003d2020-03-30\u0026extend_over_end_date\u003dtrue\u0026config%5Bgroups%5D%5B%5D\u003d0\u0026config%5Bgroups%5D%5B%5D\u003d1\u0026config%5Bgroups%5D%5B%5D\u003d2\u0026config%5Bgroups%5D%5B%5D\u003d3\u0026config%5Bgroups%5D%5B%5D\u003d4\u0026config%5Bgroups%5D%5B%5D\u003d5\u0026config%5Bgroups%5D%5B%5D\u003d6\u0026config%5Bgroups%5D%5B%5D\u003d7\u0026config%5Bgroups%5D%5B%5D\u003d8\u0026config%5Bgroups%5D%5B%5D\u003d9\u0026config%5Bstep%5D\u003d2\u0026config%5Btype%5D\u003dpercent\u0026config%5Bmeasures%5D%5B%5D\u003dconversion_rate\u0026state\u003dtrends\u0026funnel_id\u003d190\u0026rangeText\u003d\u0026sampling_factor\u003d64\u0026by_field_step\u003d-1\u0026by_field\u003duser.province","query_request":{"from_date":"2020-03-02","to_date":"2020-03-30","sampling_factor":64,"use_cache":true,"ignore_cache_expire":false,"handle_sampling":true,"extend_over_end_date":true,"un_truncate_filter_time":false,"rewrite_by_values":true,"filter":{"relation":"and"},"customer_time_zone":false}},{"id":1492,"name":"user_group_2","cname":"启动后流失用户","user_name":"总部管理员","user_id":3,"create_time":"2020-03-31 21:05:29","data_type":"BOOL","unit":"DAY","source_type":2,"is_routine":false,"status":"RUNNING","cron":"0 0 0 * * ? *","app_push_list":[],"sql":"SELECT  `e`.`user_id` as `user_id` ,MAX(`e`.`distinct_id`) AS distinct_id\n\tFROM (\n\tSELECT  `d`.`user_id` as `user_id` , `d`.`distinct_id` as `distinct_id` \n\t\tFROM (\n\t\tSELECT  `c`.`finfo` as `finfo` , `c`.`distinct_id` as `distinct_id` , `c`.`user_id` as `user_id` \n\t\t\tFROM (\n\t\t\tSELECT /* SA_SCAN_MODE_MERGE_ALL */funnel_user_by_day( 6, 604800, \u00272020-03-28 00:00:00\u0027, `a`.`funnel_step_id`, time, \u00270|1|-1,-1\u0027) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS finfo,funnel_info_parameter(`a`.`distinct_id`, 0) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS distinct_id,funnel_info_parameter(`a`.`user_id`, 1) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS user_id\n\t\t\t\tFROM (SELECT *,CASE WHEN   (`a`.`event_id` \u003d 1842) THEN 1 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1840) THEN 2 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1879) THEN 4 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1865) THEN 8 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1887) THEN 16 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1888) THEN 32 ELSE 0 END AS funnel_step_id FROM event_external_view_p22 a) a\n\t\t\t\tWHERE (`a`.`day` BETWEEN 18344 AND 18352) AND `a`.`event_bucket` IN (0,2,5,7,8,9) AND (  (  (`a`.`event_id` \u003d 1842)) OR (  (`a`.`event_id` \u003d 1840)) OR (  (`a`.`event_id` \u003d 1879)) OR (  (`a`.`event_id` \u003d 1865)) OR (  (`a`.`event_id` \u003d 1887)) OR (  (`a`.`event_id` \u003d 1888)))) c) d\n\t\tWHERE (`d`.`finfo` is not null)) e\n\tGROUP BY 1","failed_partition_count":0,"last_succeed_partition":{"base_time":"2020-05-08 00:00:00","start_time":"2020-05-08 11:25:47","finished_time":"2020-05-08 11:26:10","user_count":93353,"status":"SUCCEED"},"last_partition_info":{"base_time":"2020-05-08 00:00:00","start_time":"2020-05-08 11:25:47","finished_time":"2020-05-08 11:26:10","user_count":93353,"status":"SUCCEED","failed_message":{},"next_partition_base_time":"2020-05-09 00:00:00"},"query_url":"/funnel/#from_date\u003d2020-03-23\u0026to_date\u003d2020-03-27\u0026extend_over_end_date\u003dtrue\u0026config%5Bmeasures%5D%5B%5D\u003dconversion_rate\u0026config%5Bgroups%5D%5B%5D\u003d0\u0026config%5Bstep%5D\u003d0\u0026config%5Btype%5D\u003dpercent\u0026state\u003dtrends\u0026funnel_id\u003d223\u0026rangeText\u003d\u0026sampling_factor\u003d64","query_request":{"from_date":"2020-03-23","to_date":"2020-03-27","sampling_factor":64,"use_cache":true,"ignore_cache_expire":false,"handle_sampling":true,"extend_over_end_date":true,"un_truncate_filter_time":false,"rewrite_by_values":true,"filter":{"relation":"and"},"customer_time_zone":false}},{"id":3020,"name":"user_group_tuibaoyonghu","cname":"退保用户","user_name":"总部管理员","user_id":3,"create_time":"2020-04-22 18:27:37","data_type":"BOOL","unit":"DAY","source_type":1,"is_routine":true,"status":"RUNNING","comment":"","cron":"0 0 0 * * ? *","app_push_list":[],"rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"type":"event_sequence_rule","time_function":"relative_time","time_params":["-1 day"],"steps":[{"event":"PayInsurance","filters":[]},{"event":"TerminateInsuranceFinish","filters":[]}]}]}]}],"failed_partition_count":0,"last_succeed_partition":{"base_time":"2021-02-25 00:00:00","start_time":"2021-02-26 01:53:57","finished_time":"2021-02-26 01:54:58","user_count":26156,"status":"SUCCEED","rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"type":"event_sequence_rule","time_function":"relative_time","time_params":["-1 day"],"steps":[{"event":"PayInsurance","filters":[]},{"event":"TerminateInsuranceFinish","filters":[]}]}]}]}]},"last_partition_info":{"base_time":"2021-02-26 00:00:00","start_time":"2021-02-26 00:01:01","finished_time":"2021-02-26 00:01:01","user_count":0,"status":"DENY","failed_message":{},"next_partition_base_time":"2021-02-27 00:00:00"}},{"id":3354,"name":"user_group_system_basic","cname":"预置分群-30日内发生任意事件","user_name":"总部管理员","user_id":3,"create_time":"2020-04-26 02:19:19","data_type":"BOOL","unit":"DAY","source_type":1,"is_routine":true,"status":"RUNNING","comment":"用来标识基准用户群","cron":"0 0 0 * * ? *","app_push_list":[],"rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"$Anything"},"type":"event_rule","time_function":"relative_time","time_params":["30 day"],"params":[1.0],"function":"least","filters":[]}]}]}],"failed_partition_count":0,"last_succeed_partition":{"base_time":"2021-02-26 00:00:00","start_time":"2021-02-26 00:11:32","finished_time":"2021-02-26 00:13:07","user_count":32044,"status":"SUCCEED","rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"$Anything"},"type":"event_rule","time_function":"relative_time","time_params":["30 day"],"params":[1.0],"function":"least","filters":[]}]}]}]},"last_partition_info":{"base_time":"2021-02-26 00:00:00","start_time":"2021-02-26 00:11:32","finished_time":"2021-02-26 00:13:07","user_count":32044,"status":"SUCCEED","failed_message":{},"next_partition_base_time":"2021-02-27 00:00:00"}},{"id":8366,"name":"user_group_tbao","cname":"投保","user_name":"总部管理员","user_id":3,"create_time":"2020-09-09 18:20:59","data_type":"BOOL","unit":"DAY","source_type":1,"is_routine":true,"status":"RUNNING","comment":"","cron":"0 0 0 * * ? *","app_push_list":[],"rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"PayInsurance"},"type":"event_rule","time_function":"relative_time","time_params":["1 day"],"params":[1.0],"function":"least","filters":[{"type":"filter","field":"event.PayInsurance.$province","function":"equal","params":["福建省"]}]},{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"$AppClick"},"type":"event_rule","time_function":"relative_time","time_params":["1 day"],"params":[0.0],"function":"equal","filters":[]}]}]}],"failed_partition_count":0,"last_succeed_partition":{"base_time":"2021-02-26 00:00:00","start_time":"2021-02-26 05:32:40","finished_time":"2021-02-26 05:33:42","user_count":25,"status":"SUCCEED","rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"PayInsurance"},"type":"event_rule","time_function":"relative_time","time_params":["1 day"],"params":[1.0],"function":"least","filters":[{"type":"filter","field":"event.PayInsurance.$province","function":"equal","params":["福建省"]}]},{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"$AppClick"},"type":"event_rule","time_function":"relative_time","time_params":["1 day"],"params":[0.0],"function":"equal","filters":[]}]}]}]},"last_partition_info":{"base_time":"2021-02-26 00:00:00","start_time":"2021-02-26 05:32:40","finished_time":"2021-02-26 05:33:42","user_count":25,"status":"SUCCEED","failed_message":{},"next_partition_base_time":"2021-02-27 00:00:00"}},{"id":10075,"name":"user_group_5","cname":"投保流失","user_name":"pengxiaolong","user_id":66401,"create_time":"2020-11-06 13:55:59","data_type":"BOOL","unit":"DAY","source_type":2,"is_routine":false,"status":"RUNNING","app_push_list":[],"sql":"SELECT  `e`.`user_id` as `user_id` ,MAX(`e`.`distinct_id`) AS distinct_id\n\tFROM (\n\tSELECT  `d`.`user_id` as `user_id` , `d`.`distinct_id` as `distinct_id` \n\t\tFROM (\n\t\tSELECT  `c`.`finfo` as `finfo` , `c`.`distinct_id` as `distinct_id` , `c`.`user_id` as `user_id` \n\t\t\tFROM (\n\t\t\tSELECT /* SA_SCAN_MODE_MERGE_ALL */funnel_user_by_day( 5, 604800, \u00272020-10-31 00:00:00\u0027, `a`.`funnel_step_id`, time, \u00272|1|-1,-1\u0027) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS finfo,funnel_info_parameter(`a`.`distinct_id`, 0) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS distinct_id,funnel_info_parameter(`a`.`user_id`, 1) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS user_id\n\t\t\t\tFROM (SELECT *,CASE WHEN   (`a`.`event_id` \u003d 1879) THEN 1 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1875) THEN 2 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1904) THEN 4 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1865) THEN 8 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1887) THEN 16 ELSE 0 END AS funnel_step_id FROM event_external_view_p22 a) a\n\t\t\t\tWHERE `a`.`event_bucket` IN (4,5,7,9) AND (  (`a`.`day` BETWEEN 18565 AND 18572)) AND (  (  (`a`.`event_id` \u003d 1879)) OR (  (`a`.`event_id` \u003d 1875)) OR (  (`a`.`event_id` \u003d 1904)) OR (  (`a`.`event_id` \u003d 1865)) OR (  (`a`.`event_id` \u003d 1887)))) c) d\n\t\tWHERE (`d`.`finfo` is not null)) e\n\tGROUP BY 1","failed_partition_count":0,"last_succeed_partition":{"base_time":"2020-11-06 00:00:00","start_time":"2020-11-06 13:56:25","finished_time":"2020-11-06 13:56:54","user_count":41,"status":"SUCCEED"},"last_partition_info":{"base_time":"2020-11-06 00:00:00","start_time":"2020-11-06 13:56:25","finished_time":"2020-11-06 13:56:54","user_count":41,"status":"SUCCEED","failed_message":{}},"query_url":"/funnel/#from_date\u003d2020-10-30\u0026to_date\u003d2020-10-30\u0026extend_over_end_date\u003dtrue\u0026config%5Bgroups%5D%5B%5D\u003d0\u0026config%5Bstep%5D\u003d2\u0026config%5Btype%5D\u003dpercent\u0026config%5Bmeasures%5D%5B%5D\u003dconversion_rate\u0026state\u003dtrends\u0026funnel_id\u003d193\u0026rangeText\u003d\u0026sampling_factor\u003d64","query_request":{"from_date":"2020-10-30","to_date":"2020-10-30","sampling_factor":64,"use_cache":true,"ignore_cache_expire":false,"handle_sampling":true,"extend_over_end_date":true,"un_truncate_filter_time":false,"rewrite_by_values":true,"filter":{"relation":"and"},"customer_time_zone":false}},{"id":11268,"name":"user_group_10","cname":"泛华分群","user_name":"总部管理员","user_id":3,"create_time":"2020-12-16 10:25:19","data_type":"BOOL","unit":"DAY","source_type":2,"is_routine":false,"status":"RUNNING","app_push_list":[],"sql":"SELECT  `e`.`user_id` as `user_id` ,MAX(`e`.`distinct_id`) AS distinct_id\n\tFROM (\n\tSELECT  `d`.`user_id` as `user_id` , `d`.`distinct_id` as `distinct_id` \n\t\tFROM (\n\t\tSELECT  `c`.`finfo` as `finfo` , `c`.`distinct_id` as `distinct_id` , `c`.`user_id` as `user_id` \n\t\t\tFROM (\n\t\t\tSELECT /* SA_SCAN_MODE_MERGE_ALL */funnel_user_by_day( 6, 604800, \u00272020-12-16 00:00:00\u0027, `a`.`funnel_step_id`, time, \u00272|1|-1,-1\u0027) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS finfo,funnel_info_parameter(`a`.`distinct_id`, 0) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS distinct_id,funnel_info_parameter(`a`.`user_id`, 1) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS user_id\n\t\t\t\tFROM (SELECT *,CASE WHEN   (`a`.`event_id` \u003d 1885) THEN 1 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1879) THEN 2 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1877) THEN 4 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1904) THEN 8 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1865) THEN 16 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1888) THEN 32 ELSE 0 END AS funnel_step_id FROM event_external_view_p22 a) a\n\t\t\t\tWHERE `a`.`event_bucket` IN (4,5,7,8,9) AND (  (`a`.`day` BETWEEN 18605 AND 18618)) AND (  (  (`a`.`event_id` \u003d 1885)) OR (  (`a`.`event_id` \u003d 1879)) OR (  (`a`.`event_id` \u003d 1877)) OR (  (`a`.`event_id` \u003d 1904)) OR (  (`a`.`event_id` \u003d 1865)) OR (  (`a`.`event_id` \u003d 1888)))) c) d\n\t\tWHERE (`d`.`finfo` is not null)) e\n\tGROUP BY 1","failed_partition_count":0,"last_succeed_partition":{"base_time":"2020-12-16 00:00:00","start_time":"2020-12-16 10:25:46","finished_time":"2020-12-16 10:26:24","user_count":3732,"status":"SUCCEED"},"last_partition_info":{"base_time":"2020-12-16 00:00:00","start_time":"2020-12-16 10:25:46","finished_time":"2020-12-16 10:26:24","user_count":3732,"status":"SUCCEED","failed_message":{}},"query_url":"/funnel/#first_event%5Bevent_name%5D\u003d%24pageview\u0026first_event%5Bfilter%5D%5Bconditions%5D%5B0%5D%5Bfield%5D\u003devent.%24pageview.platformType\u0026first_event%5Bfilter%5D%5Bconditions%5D%5B0%5D%5Bfunction%5D\u003dequal\u0026first_event%5Bfilter%5D%5Bconditions%5D%5B0%5D%5Bparams%5D%5B%5D\u003d%E5%B1%95%E4%B8%9A%E7%AB%AF\u0026first_event%5Brelevance_field%5D\u003d\u0026second_event%5Bevent_name%5D\u003d%24pageview\u0026second_event%5Bfilter%5D%5Bconditions%5D%5B0%5D%5Bfield%5D\u003devent.%24pageview.platformType\u0026second_event%5Bfilter%5D%5Bconditions%5D%5B0%5D%5Bfunction%5D\u003dequal\u0026second_event%5Bfilter%5D%5Bconditions%5D%5B0%5D%5Bparams%5D%5B%5D\u003d%E5%B1%95%E4%B8%9A%E7%AB%AF\u0026second_event%5Brelevance_field%5D\u003d\u0026duration\u003d7\u0026unit\u003dday\u0026from_date\u003d2020-12-09\u0026to_date\u003d2020-12-15\u0026extend_over_end_date\u003dtrue\u0026rangeText\u003d%E8%BF%87%E5%8E%BB+7+%E5%A4%A9\u0026chartsType\u003draw\u0026sampling_factor\u003d64\u0026is_wastage\u003dfalse\u0026duration_true_name\u003d3\u0026show_zero_day\u003d\u0026config%5Bmeasures%5D%5B%5D\u003dconversion_rate\u0026config%5Bgroups%5D%5B%5D\u003d0\u0026config%5Bgroups%5D%5B%5D\u003d1\u0026config%5Bgroups%5D%5B%5D\u003d2\u0026config%5Bgroups%5D%5B%5D\u003d3\u0026config%5Bgroups%5D%5B%5D\u003d4\u0026config%5Bgroups%5D%5B%5D\u003d5\u0026config%5Bgroups%5D%5B%5D\u003d6\u0026config%5Bgroups%5D%5B%5D\u003d7\u0026config%5Bgroups%5D%5B%5D\u003d8\u0026config%5Bgroups%5D%5B%5D\u003d9\u0026config%5Bstep%5D\u003d2\u0026config%5Btype%5D\u003dpercent\u0026state\u003dtrends\u0026funnel_id\u003d473\u0026by_field_step\u003d0\u0026by_field\u003devent.OpenInsurancePlan.agent_id\u0026bookmarkid\u003d14350","query_request":{"from_date":"2020-12-09","to_date":"2020-12-15","unit":"day","sampling_factor":64,"use_cache":true,"ignore_cache_expire":false,"handle_sampling":true,"extend_over_end_date":true,"un_truncate_filter_time":false,"rewrite_by_values":true,"filter":{"relation":"and"},"customer_time_zone":false}},{"id":11897,"name":"user_group_fq2","cname":"分群2","user_name":"pengxiaolong","user_id":66401,"create_time":"2021-01-05 14:25:05","data_type":"BOOL","unit":"DAY","source_type":1,"is_routine":true,"status":"RUNNING","cron":"0 0 0 * * ? *","app_push_list":[],"rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"RegistFinish"},"type":"event_rule","time_function":"relative_time","time_params":["last month"],"params":[0.0],"function":"equal","filters":[]}]}]}],"failed_partition_count":0,"last_succeed_partition":{"base_time":"2021-02-26 00:00:00","start_time":"2021-02-26 05:40:27","finished_time":"2021-02-26 05:41:27","user_count":635385,"status":"SUCCEED","rule_content_list":[{"type":"rules_relation","relation":"and","rules":[{"type":"rules_relation","relation":"and","rules":[{"measure":{"aggregator":"general","field":"","type":"event_measure","event_name":"RegistFinish"},"type":"event_rule","time_function":"relative_time","time_params":["last month"],"params":[0.0],"function":"equal","filters":[]}]}]}]},"last_partition_info":{"base_time":"2021-02-26 00:00:00","start_time":"2021-02-26 05:40:27","finished_time":"2021-02-26 05:41:27","user_count":635385,"status":"SUCCEED","failed_message":{},"next_partition_base_time":"2021-02-27 00:00:00"}},{"id":12752,"name":"user_group_13","cname":"入保费测算页未转化","user_name":"总部管理员","user_id":3,"create_time":"2021-01-29 13:03:00","data_type":"BOOL","unit":"DAY","source_type":2,"is_routine":false,"status":"RUNNING","app_push_list":[],"sql":"SELECT  `e`.`user_id` as `user_id` ,MAX(`e`.`distinct_id`) AS distinct_id\n\tFROM (\n\tSELECT  `d`.`user_id` as `user_id` , `d`.`distinct_id` as `distinct_id` \n\t\tFROM (\n\t\tSELECT  `c`.`finfo` as `finfo` , `c`.`distinct_id` as `distinct_id` , `c`.`user_id` as `user_id` \n\t\t\tFROM (\n\t\t\tSELECT /* SA_SCAN_MODE_MERGE_ALL */funnel_user_by_day( 6, 604800, \u00272021-01-29 00:00:00\u0027, `a`.`funnel_step_id`, time, \u00271|1|-1,-1\u0027) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS finfo,funnel_info_parameter(`a`.`distinct_id`, 0) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS distinct_id,funnel_info_parameter(`a`.`user_id`, 1) OVER (PARTITION BY `a`.`user_id` ORDER BY `a`.`time` ASC ) AS user_id\n\t\t\t\tFROM (SELECT *,CASE WHEN   (`a`.`event_id` \u003d 1880) THEN 1 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1877) THEN 2 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1904) THEN 4 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1865) THEN 8 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1887) THEN 16 ELSE 0 END | CASE WHEN   (`a`.`event_id` \u003d 1888) THEN 32 ELSE 0 END AS funnel_step_id FROM event_external_view_p22 a) a\n\t\t\t\tWHERE `a`.`event_bucket` IN (0,4,5,7,8) AND (  (`a`.`day` BETWEEN 18649 AND 18662)) AND (  (  (`a`.`event_id` \u003d 1880)) OR (  (`a`.`event_id` \u003d 1877)) OR (  (`a`.`event_id` \u003d 1904)) OR (  (`a`.`event_id` \u003d 1865)) OR (  (`a`.`event_id` \u003d 1887)) OR (  (`a`.`event_id` \u003d 1888)))) c) d\n\t\tWHERE (`d`.`finfo` is not null)) e\n\tGROUP BY 1","failed_partition_count":0,"last_succeed_partition":{"base_time":"2021-01-29 00:00:00","start_time":"2021-01-29 13:03:27","finished_time":"2021-01-29 13:04:05","user_count":2289,"status":"SUCCEED"},"last_partition_info":{"base_time":"2021-01-29 00:00:00","start_time":"2021-01-29 13:03:27","finished_time":"2021-01-29 13:04:05","user_count":2289,"status":"SUCCEED","failed_message":{}},"query_url":"/funnel/#from_date\u003d2021-01-22\u0026to_date\u003d2021-01-28\u0026extend_over_end_date\u003dtrue\u0026config%5Bmeasures%5D%5B%5D\u003dconversion_rate\u0026config%5Bgroups%5D%5B%5D\u003d0\u0026config%5Bstep%5D\u003d1\u0026config%5Btype%5D\u003dpercent\u0026state\u003dtrends\u0026funnel_id\u003d450\u0026rangeText\u003d%E8%BF%87%E5%8E%BB+7+%E5%A4%A9\u0026sampling_factor\u003d64\u0026by_field_step\u003d0\u0026by_field\u003devent.InsuranceDetailView.insurance_type\u0026bookmarkid\u003d14154","query_request":{"from_date":"2021-01-22","to_date":"2021-01-28","sampling_factor":64,"use_cache":true,"ignore_cache_expire":false,"handle_sampling":true,"extend_over_end_date":true,"un_truncate_filter_time":false,"rewrite_by_values":true,"filter":{"relation":"and"},"customer_time_zone":false}},{"id":13306,"name":"user_group_yang","cname":"分群18","user_name":"187****6022","user_id":110869,"create_time":"2021-02-22 15:37:28","data_type":"BOOL","unit":"DAY","source_type":5,"is_routine":false,"status":"RUNNING","app_push_list":[],"failed_partition_count":0,"last_succeed_partition":{"base_time":"2021-02-22 00:00:00","start_time":"2021-02-22 15:37:37","finished_time":"2021-02-22 15:38:37","user_count":1,"status":"SUCCEED"},"last_partition_info":{"base_time":"2021-02-22 00:00:00","start_time":"2021-02-22 15:37:37","finished_time":"2021-02-22 15:38:37","user_count":1,"status":"SUCCEED","failed_message":{}}},{"id":13345,"name":"user_group_nh123","cname":"你好123","user_name":"187****6022","user_id":110869,"create_time":"2021-02-23 14:27:36","data_type":"BOOL","unit":"DAY","source_type":5,"is_routine":false,"status":"RUNNING","comment":"12345678","app_push_list":[],"failed_partition_count":0,"last_succeed_partition":{"base_time":"2021-02-23 00:00:00","start_time":"2021-02-23 14:27:42","finished_time":"2021-02-23 14:28:56","user_count":1,"status":"SUCCEED"},"last_partition_info":{"base_time":"2021-02-23 00:00:00","start_time":"2021-02-23 14:27:42","finished_time":"2021-02-23 14:28:56","user_count":1,"status":"SUCCEED","failed_message":{}}}]
