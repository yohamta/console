"use strict";(self.webpackChunkportal_ui=self.webpackChunkportal_ui||[]).push([[455],{80455:function(n,e,t){t.r(e);var o=t(70885),i=(t(72791),t(26181)),s=t.n(i),c=t(60364),r=t(51691),a=t(42649),l=t(9505),u=t(23508),d=t(13048),f=t(80184),v=(0,c.$j)(null,{setErrorSnackMessage:a.Ih});e.default=v((function(n){var e=n.closeDeleteModalAndRefresh,t=n.deleteOpen,i=n.selectedBucket,c=n.bucketEvent,a=n.setErrorSnackMessage,v=(0,l.Z)((function(){return e(!0)}),(function(n){return a(n)})),m=(0,o.Z)(v,2),Z=m[0],x=m[1];if(!i)return null;return(0,f.jsx)(u.Z,{title:"Delete Event",confirmText:"Delete",isOpen:t,titleIcon:(0,f.jsx)(d.Nv,{}),isLoading:Z,onConfirm:function(){if(null!==c){var n=s()(c,"events",[]),e=s()(c,"prefix",""),t=s()(c,"suffix","");x("DELETE","/api/v1/buckets/".concat(i,"/events/").concat(c.arn),{events:n,prefix:e,suffix:t})}},onClose:function(){return e(!1)},confirmationContent:(0,f.jsx)(r.Z,{children:"Are you sure you want to delete this event?"})})}))},9505:function(n,e,t){var o=t(70885),i=t(72791),s=t(81207);e.Z=function(n,e){var t=(0,i.useState)(!1),c=(0,o.Z)(t,2),r=c[0],a=c[1];return[r,function(t,o,i){a(!0),s.Z.invoke(t,o,i).then((function(e){a(!1),n(e)})).catch((function(n){a(!1),e(n)}))}]}},23508:function(n,e,t){var o=t(1413),i=t(72791),s=t(5574),c=t(65661),r=t(39157),a=t(97123),l=t(36151),u=t(59860),d=t(13400),f=t(29823),v=t(11135),m=t(25787),Z=t(23814),x=t(80184);e.Z=(0,m.Z)((function(n){return(0,v.Z)((0,o.Z)({},Z.Qw))}))((function(n){var e=n.isOpen,t=void 0!==e&&e,v=n.onClose,m=n.onCancel,Z=n.onConfirm,p=n.classes,h=void 0===p?{}:p,C=n.title,j=void 0===C?"":C,k=n.isLoading,b=n.confirmationContent,N=n.cancelText,g=void 0===N?"Cancel":N,E=n.confirmText,y=void 0===E?"Confirm":E,B=n.confirmButtonProps,M=void 0===B?{}:B,T=n.cancelButtonProps,w=void 0===T?{}:T,D=n.titleIcon,I=void 0===D?null:D;return(0,x.jsxs)(s.Z,{open:t,onClose:function(n,e){"backdropClick"!==e&&v()},className:h.root,sx:{"& .MuiPaper-root":{padding:"1rem 2rem 2rem 1rem"}},children:[(0,x.jsxs)(c.Z,{className:h.title,children:[(0,x.jsxs)("div",{className:h.titleText,children:[I," ",j]}),(0,x.jsx)("div",{className:h.closeContainer,children:(0,x.jsx)(d.Z,{"aria-label":"close",className:h.closeButton,onClick:v,disableRipple:!0,size:"small",children:(0,x.jsx)(f.Z,{})})})]}),(0,x.jsx)(r.Z,{className:h.content,children:b}),(0,x.jsxs)(a.Z,{className:h.actions,children:[(0,x.jsx)(l.Z,(0,o.Z)((0,o.Z)({className:h.cancelButton,onClick:m||v,disabled:k,type:"button"},w),{},{variant:"outlined",color:"primary",id:"confirm-cancel",children:g})),(0,x.jsx)(u.Z,(0,o.Z)((0,o.Z)({className:h.confirmButton,type:"button",onClick:Z,loading:k,disabled:k,variant:"outlined",color:"secondary",loadingPosition:"start",startIcon:(0,x.jsx)(i.Fragment,{}),autoFocus:!0,id:"confirm-ok"},M),{},{children:y}))]})]})}))},29823:function(n,e,t){var o=t(95318);e.Z=void 0;var i=o(t(45649)),s=t(80184),c=(0,i.default)((0,s.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");e.Z=c}}]);
//# sourceMappingURL=455.f7e76ee0.chunk.js.map