const PageHeader = ({icon, title, subtitle, actionButton}) => {
    return ( 
        <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex align-items-center gap-3">
            <img src={`images/NavPageIcons/${icon}`}
            alt="Logo" className="img-fluid" 
            style={{ width: "45px" }} />
          <div className="me-auto">
            <h2 className="fw-bold mb-1">
                {title}
            </h2>
            <p className="text-muted mb-0">
              {subtitle}
            </p>
          </div>
            {actionButton}
        </div>
      </div>
     );
}
 
export default PageHeader;