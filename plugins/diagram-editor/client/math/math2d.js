function Point2D(x, y) {
	this.x = x;
	this.y = y;
}

Point2D.zero = new Point2D(0, 0);

Point2D.sub = function(a,b) {
	return new Point2D(a.x - b.x, a.y - b.y);
}

Point2D.prototype.sub = function(a) {
	return Point2D.sub(this, a);
}


Point2D.prototype.getX = function() {
	return this.x;
}

Point2D.prototype.getY = function() {
	return this.y;
}


Point2D.prototype.setLocation = function(x, y) {
	this.x = x;
	this.y = y;
}

/*
public String toString() {
        return "Point2D.Double["+x+", "+y+"]";
    }


    public void setLocation(Point2D p) {
        setLocation(p.getX(), p.getY());
    }
    */

/*
Point2D.prototype.distanceSq = function(x1, y1, x2, y2) {
    x1 -= x2;
    y1 -= y2;
    return (x1 * x1 + y1 * y1);
}

    public static double distance(double x1, double y1,
                                  double x2, double y2)
    {
        x1 -= x2;
        y1 -= y2;
        return Math.sqrt(x1 * x1 + y1 * y1);
    }
*/
Point2D.prototype.distanceSq = function(px, py) {
	px -= this.getX();
	py -= this.getY();
	return (px * px + py * py);
}

Point2D.distanceSq = function(p, q) {
    var xx = p.x - q.x;
    var yy = p.y - q.y;
    return (xx * xx + yy * yy);
}

/*
    public double distanceSq(Point2D pt) {
        double px = pt.getX() - this.getX();
        double py = pt.getY() - this.getY();
        return (px * px + py * py);
    }

    public double distance(Point2D pt) {
        double px = pt.getX() - this.getX();
        double py = pt.getY() - this.getY();
        return Math.sqrt(px * px + py * py);
    }

    public Object clone() {
    	return new Point2D(x, y);
    }
*/

/**
 * Line2D
 * @param x1,y1,x2,y2
 */
function Line2D(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
}

Line2D.prototype.getX1 = function() {
	return this.x1;
}

Line2D.prototype.getY1 = function() {
	return this.y1;
}

Line2D.prototype.getX2 = function() {
	return this.x2;
}

Line2D.prototype.getY2 = function() {
	return this.y2;
}


Line2D.prototype.setLine = function(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
}

Line2D.prototype.getP1 = function() {
	return new Point2D(this.x1, this.y1);
}

Line2D.prototype.getP2 = function() {
	return new Point2D(this.x2, this.y2);
}

Line2D.prototype.getBounds2D = function() {
    var x;
    var y;
    var w;
    var h;
    if (this.x1 < this.x2) {
        x = this.x1;
        w = this.x2 - this.x1;
    } else {
        x = this.x2;
        w = this.x1 - this.x2;
    }
    if (this.y1 < this.y2) {
        y = this.y1;
        h = this.y2 - this.y1;
    } else {
        y = this.y2;
        h = this.y1 - this.y2;
    }
    return new Rectangle2D(x, y, w, h);
}

Line2D.prototype.getConnect = function(l) {
	var dBunbo	= (this.getX2() - this.getX1() )
    	 		* ( l.getY2() - l.getY1() )
    	 		- ( this.getY2() - this.getY1() )
    	 		* ( l.getX2() - l.getX1());
    	 
    	 if( 0 == dBunbo )
    	 {
    		 return null;
    	 }
    	 
    	 var vectorAC = new Point2D(l.getX1() - this.getX1(), l.getY1() - this.getY1());
    	 
    	 var dR = ( ( l.getY2() - l.getY1() ) * vectorAC.x - ( l.getX2() - l.getX1() ) * vectorAC.y ) / dBunbo;
//	    	 double dS = ( ( getY2() - getY1() ) * vectorAC.x - ( getX2() - getX1() ) * vectorAC.y ) / dBunbo;
    	 
    	 return new Point2D(this.getX1() + dR * (this.getX2() - this.getX1()), this.getY1() + dR * (this.getY2() - this.getY1()));
    	 }

/**
 * static関数
 */
Line2D.relativeCCW = function(x1, y1, x2, y2, px, py) {
    	 x2 -= x1;
    	 y2 -= y1;
    	 px -= x1;
    	 py -= y1;
    	 var ccw = px * y2 - py * x2;
    	 if (ccw == 0.0) {
    		 ccw = px * x2 + py * y2;
    		 if (ccw > 0.0) {
    			 px -= x2;
    			 py -= y2;
    			 ccw = px * x2 + py * y2;
    			 if (ccw < 0.0) {
    				 ccw = 0.0;
    			 }
    		 }
    	 }
    	 if(ccw < 0.0) {
    		 return -1;
    	 }else{
    		 if(ccw > 0.0) {
    			 return 1;
    		 }else{
    			 return 0
    		 }
    	 }
//	    	 return (ccw < 0.0) ? -1 : ((ccw > 0.0) ? 1 : 0);
}
     
Line2D.prototype.relativeCCW = function(px, py) {
	 return relativeCCW(this.getX1(), this.getY1(), this.getX2(), this.getY2(), px, py);
}
     
Line2D.prototype.relativeCCW = function(p) {
    	 return relativeCCW(this.getX1(), this.getY1(), this.getX2(), this.getY2(),
    	       p.getX(), p.getY());
}
    	
Line2D.linesIntersect = function(x1, y1, x2, y2, x3, y3, x4, y4) {
	return ((Line2D.relativeCCW(x1, y1, x2, y2, x3, y3) *
			Line2D.relativeCCW(x1, y1, x2, y2, x4, y4) <= 0)
			&& (Line2D.relativeCCW(x3, y3, x4, y4, x1, y1) *
					Line2D.relativeCCW(x3, y3, x4, y4, x2, y2) <= 0));
}

Line2D.prototype.intersectsLine = function(x1, y1, x2, y2) {
	return Line2D.linesIntersect(x1, y1, x2, y2,
	         this.getX1(), this.getY1(), this.getX2(), this.getY2());
}

/*
	public boolean intersectsLine(Line2D l) {
		return linesIntersect(l.getX1(), l.getY1(), l.getX2(), l.getY2(),
	         getX1(), getY1(), getX2(), getY2());
	}
	*/
	
Line2D.ptSegDistSq = function(x1, y1, x2, y2, px, py) {
	x2 -= x1;
	y2 -= y1;
	px -= x1;
	py -= y1;
	var dotprod = px * x2 + py * y2;
	var projlenSq;
	if (dotprod <= 0.0) {
		projlenSq = 0.0;
	} else {
		px = x2 - px;
		py = y2 - py;
		dotprod = px * x2 + py * y2;
		if (dotprod <= 0.0) {
			projlenSq = 0.0;
		} else {
			projlenSq = dotprod * dotprod / (x2 * x2 + y2 * y2);
		}
	}
	var lenSq = px * px + py * py - projlenSq;
	if (lenSq < 0) {
		lenSq = 0;
	}
	return lenSq;
}

/**
 * static関数
 */
Line2D.ptSegDist = function(x1, y1, x2, y2, px, py) {
	return Math.sqrt(Line2D.ptSegDistSq(x1, y1, x2, y2, px, py));
}

Line2D.prototype.ptSegDistSq = function(px, py) {
	return Line2D.ptSegDistSq(this.x1, this.y1, this.x2, this.y2, px, py);
}

/*
	public double ptSegDistSq(Point2D pt) {
		return ptSegDistSq(getX1(), getY1(), getX2(), getY2(),
	      pt.getX(), pt.getY());
	}
	*/
	

Line2D.prototype.ptSegDist = function(px, py) {
	return Line2D.ptSegDist(this.x1, this.y1, this.x2, this.y2, px, py);
}

/*	
	public double ptSegDist(Point2D pt) {
		return ptSegDist(getX1(), getY1(), getX2(), getY2(),
	    pt.getX(), pt.getY());
	}
	
	*/

Line2D.ptLineDistSq = function(x1, y1, x2, y2, px, py) {
	x2 -= x1;
	y2 -= y1;
	px -= x1;
	py -= y1;
	var dotprod = px * x2 + py * y2;
	var projlenSq = dotprod * dotprod / (x2 * x2 + y2 * y2);
	var lenSq = px * px + py * py - projlenSq;
	if (lenSq < 0) {
		lenSq = 0;
	}
	return lenSq;
}
	
Line2D.ptLineDist = function(x1, y1, x2, y2, px, py) {
	return Math.sqrt(ptLineDistSq(x1, y1, x2, y2, px, py));
}
	
Line2D.prototype.ptLineDistSq = function(px, py) {
	return ptLineDistSq(this.x1, this.y1, this.x2, this.y2, px, py);
}

Line2D.prototype.ptLineDist = function(px, py) {
	return ptLineDist(this.x1, this.y1, this.x2, this.y2, px, py);
}

/*	
	public double ptLineDistSq(Point2D pt) {
		return ptLineDistSq(getX1(), getY1(), getX2(), getY2(),
				pt.getX(), pt.getY());
	}

	public double ptLineDist(Point2D pt) {
		return ptLineDist(getX1(), getY1(), getX2(), getY2(),
				pt.getX(), pt.getY());
	}
	
	
	public boolean contains(double x, double y) {
		return false;
	}
	
	public boolean contains(Point2D p) {
		return false;
	}
	
	*/

	/**
	* {@inheritDoc}
	* @since 1.2
	*/

/*
	public boolean intersects(double x, double y, double w, double h) {
		return intersects(new Rectangle2D(x, y, w, h));
	}
	
	public boolean intersects(Rectangle2D r) {
		return r.intersectsLine(getX1(), getY1(), getX2(), getY2());
	}
	
	
	public boolean contains(double x, double y, double w, double h) {
		return false;
	}
	
	public boolean contains(Rectangle2D r) {
		return false;
	}
	
	public Rectangle2D getBounds() {
		return getBounds2D();
	}
	
	public Object clone() {
		return new Line2D(x1, y1, x2, y2);
	}
	*/

function Rectangle2D(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Rectangle2D.OUT_LEFT = 1;
Rectangle2D.OUT_TOP = 2;
Rectangle2D.OUT_RIGHT = 4;
Rectangle2D.OUT_BOTTOM = 8;

Rectangle2D.prototype.getX = function() {
	return this.x;
}

Rectangle2D.prototype.getY = function() {
	return this.y;
}

Rectangle2D.prototype.getWidth = function() {
	return this.width;
}

Rectangle2D.prototype.getHeight = function() {
	return this.height;
}

Rectangle2D.prototype.contains = function(x, y) {
    var x0 = this.getX();
    var y0 = this.getY();
    return (x >= x0 &&
            y >= y0 &&
            x < x0 + this.getWidth() &&
            y < y0 + this.getHeight());
}

Rectangle2D.contains = function(rect,p) {
    return (p.x >= rect.x &&
            p.y >= rect.y &&
            p.x < rect.x + rect.width &&
            p.y < rect.y + rect.height);	
}

module.exports = {
	Point2D: Point2D,
	Line2D: Line2D,
	Rectangle2D: Rectangle2D
}
