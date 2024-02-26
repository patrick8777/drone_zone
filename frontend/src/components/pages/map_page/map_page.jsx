export default function MapPage(){
 return (
    <div className=" flex w-screen h-full">
      <iframe
        title="Drone allowed map"
        className="w-full h-full p-5"
        src="https://map.geo.admin.ch/?layers=ch.bazl.einschraenkungen-drohnen&lang=en&topic=ech&bgLayer=ch.swisstopo.swissimage&layers_opacity=0.6&E=2684108.37&N=1246559.56&zoom=2"
        style={{ border: "none" }}
      />
    </div>
  );
}