/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
	id: string;
}
interface JQuery {
	mMenu(options: any): JQuery;
	animateClass(options: any): JQuery;
	setActiveItem(item: any): JQuery;
	getPageTitle(item: any): JQuery;
	getBreadcrumbs(item: any): JQuery;
	validate(options: any): JQuery;
	valid(): JQuery;
	resetForm(): JQuery;
	markdown(): JQuery;
}


// declare var KTMenu: any;
// declare var KTOffcanvas: any;
// declare var KTScrolltop: any;
// declare var KTHeader: any;
// declare var KTToggle: any;
// declare var KTUtil: any;
// declare var KTPortlet: any;
// declare var KTDialog: any;
// declare var Chart: any;
